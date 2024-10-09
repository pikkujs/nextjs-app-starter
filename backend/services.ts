import {
  VrameworkSessionService,
  JoseJWTService,
} from '@vramework/services-local'
import { ConsoleLogger, CreateSessionServices } from '@vramework/core'

import { Config, SingletonServices, UserSession } from './api'
import { BookService } from './book.service'

import './generated/routes'
import './generated/schemas'

export const createSingletonServices = async (
  config: Config
): Promise<SingletonServices> => {
  const logger = new ConsoleLogger()

  if (config.logLevel) {
    logger.setLevel(config.logLevel)
  }

  const jwt = new JoseJWTService<UserSession>(
    async () => [
      {
        id: 'my-key',
        value: 'the-yellow-puppet',
      },
    ],
    logger
  )

  const sessionService = new VrameworkSessionService(jwt, {})

  const booksService = new BookService()
  books.forEach(book => booksService.createBook(book))

  return {
    config,
    logger,
    jwt,
    sessionService,
    books: booksService
  }
}

export const createSessionServices: CreateSessionServices = async (
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
