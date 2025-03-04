import { UserSession } from './backend/application-types.js'
import { JoseJWTService } from '@pikku/jose'
import { PikkuHTTPSessionService } from '@pikku/core/http/pikku-http-session-service'
import { PikkuNextRequest } from '@pikku/next/pikku-next-request'
import { NextRequest, NextResponse } from 'next/server.js'

// 1. Specify protected and public routes
const protectedRoutes: string[] = []
const publicRoutes: string[] = ['/books', '/']

const jwtService = new JoseJWTService<UserSession>(async () => [
  {
    id: 'my-key',
    value: 'the-yellow-puppet',
  },
])

const sessionService = new PikkuHTTPSessionService<UserSession>(jwtService, {
  cookieNames: ['session'],
  getSessionForCookieValue: async (cookieValue) => {
    const session: any = await jwtService.decode(cookieValue)
    return session.payload
  },
})

export default async function middleware(req: NextRequest) {
  // 1. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  let userSession
  try {
    // 2. Decrypt the session from the cookie
    userSession = await sessionService.getUserSession(
      false,
      new PikkuNextRequest(req as any) as any
    )
  } catch (e) {
    // An error trying to get the user session
    console.error(e)
  }

  // 3. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !userSession?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 6. Redirect to /books if the user is authenticated
  if (
    isPublicRoute &&
    userSession?.userId &&
    !req.nextUrl.pathname.startsWith('/books')
  ) {
    return NextResponse.redirect(new URL('/books', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
