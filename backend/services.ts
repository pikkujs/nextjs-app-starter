import { CreateSessionServices, CreateSingletonServices } from '@vramework/core'
import { ConsoleLogger, LocalVariablesService } from '@vramework/core/services'
import { VrameworkHTTPSessionService } from '@vramework/core/http'
import { JoseJWTService } from '@vramework/jose'

import { Config, Services, SingletonServices, UserSession } from './application-types.js'
import { BookService } from './book.service.js'

import './.vramework/vramework-bootstrap'

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

  const httpSessionService = new VrameworkHTTPSessionService(jwt, {})

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

const books = [
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "year": 1960
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "year": 1949
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "year": 1813
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "year": 1951
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
  },
  {
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "year": 1851
  },
  {
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "year": 1869
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "year": 1937
  },
  {
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "year": 1954
  },
  {
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "year": 1997
  }
]
