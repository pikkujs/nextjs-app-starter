import { CreateSessionServices, CreateSingletonServices } from '@pikku/core'
import { ConsoleLogger, LocalVariablesService } from '@pikku/core/services'
import { PikkuHTTPSessionService } from '@pikku/core/http'
import { JoseJWTService } from '@pikku/jose'

import { Config, Services, SingletonServices, UserSession } from './application-types.js'
import { BookService } from './book.service.js'

import './.pikku/pikku-bootstrap.gen.js'
import { books } from './books.js'

export const createSingletonServices: CreateSingletonServices<Config, SingletonServices> = async (
  config: Config
): Promise<SingletonServices> => {
  const logger = new ConsoleLogger()

  if (config.logLevel) {
    logger.setLevel(config.logLevel)
  }

  const variablesService = new LocalVariablesService()

  const jwt = new JoseJWTService<UserSession>(
    async () => [
      {
        id: 'my-key',
        value: 'the-yellow-puppet',
      },
    ],
    logger
  )

  const httpSessionService = new PikkuHTTPSessionService(jwt, {})

  const booksService = new BookService()
  books.forEach(book => booksService.createBook(book))

  return {
    config,
    logger,
    jwt,
    variablesService,
    httpSessionService,
    books: booksService
  }
}

export const createSessionServices: CreateSessionServices<SingletonServices, Services, UserSession> = async (
  singletonServices,
  _session
) => {
  return {
    ...singletonServices,
  }
}
