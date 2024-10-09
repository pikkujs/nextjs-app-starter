import { VrameworkNextJS } from '@vramework/deploy-next'
import { APIRouteMethod, CreateSessionServices } from '@vramework/core'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { RoutesMap, RouteHandlerOf } from './generated/routes'
import { config } from './config'
import { createSingletonServices } from './services'

const createSessionServices: CreateSessionServices = async (
  singletonServices,
  _session
) => {
  return {
    ...singletonServices,
  }
}

let _vramework: VrameworkNextJS | undefined

export const vramework = () => {
  if (!_vramework) {
    _vramework = new VrameworkNextJS(
      config,
      createSingletonServices as any,
      createSessionServices
    )
  }

  const actionRequest = async <
    Route extends keyof RoutesMap,
    Method extends keyof RoutesMap[Route]
  >(
    route: Route,
    method: Method,
    data: RouteHandlerOf<Route, Method>['input']
  ): Promise<RouteHandlerOf<Route, Method>['output']> => {
    return _vramework!.actionRequest(route, method, data as any)
  }

  const ssrRequest = <Route extends keyof RoutesMap, Method extends keyof RoutesMap[Route]>(
    request: IncomingMessage & {
      cookies: Partial<{ [key: string]: string }>;
    },
    response: ServerResponse<IncomingMessage>,
    route: Route,
    method: Method,
    data: RouteHandlerOf<Route, Method>['input']
  ): Promise<RouteHandlerOf<Route, Method>['output']> => {
    return _vramework!.ssrRequest(request, response, route, method as APIRouteMethod, data as any)
  }

  const apiRequest = <Route extends keyof RoutesMap, Method extends keyof RoutesMap[Route]>(
    request: NextApiRequest,
    response: NextApiResponse,
    route: Route,
    method: Method,
  ): Promise<void> => {
    return _vramework!.apiRequest(request, response, route, method as APIRouteMethod)
  }

  return {
    actionRequest,
    apiRequest,
    ssrRequest
  }
}

