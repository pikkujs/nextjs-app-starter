import {
  CoreConfig,
  CoreServices,
  CoreSingletonServices,
  CoreUserSession,
  JWTService
} from '@pikku/core'
import { BookService } from './book.service.js'

export interface Config extends CoreConfig {}

export interface UserSession extends CoreUserSession {
  userId: string
}

export type SingletonServices = CoreSingletonServices & {
  jwt: JWTService<UserSession>
  books: BookService
}

export interface Services extends CoreServices<SingletonServices> {}
