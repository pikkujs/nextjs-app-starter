import { addRoute } from '@vramework/core/http'

import type { UpdateBook, CreateBook, JustBookId, Books, Book } from './books.types.js'
import type { Services } from './application-types.js'
import type { APIFunction } from './.vramework/vramework-types.js'

const getBooks: APIFunction<void, Books> = async (services: Services) => {
  return await services.books.getBooks()
}

addRoute({
  auth: false,
  method: 'get',
  route: '/books',
  func: getBooks
})

const createBook: APIFunction<CreateBook, void> = async (services, book) => {
  await services.books.createBook(book)
}

addRoute({
  auth: false,
  method: 'post',
  route: '/book',
  func: createBook
})

const getBook: APIFunction<JustBookId, Book> = async (services, book) => {
  return await services.books.getBook(book.id)
}

addRoute({
  auth: false,
  method: 'get',
  route: '/book/:id',
  func: getBook
})

const updateBook: APIFunction<UpdateBook, Book> = async (services, { id, ...update }) => {
  return await services.books.updateBook(id, update)
}

addRoute({
  auth: false,
  method: 'patch',
  route: '/book/:id',
  func: updateBook
})

const deleteBook: APIFunction<JustBookId, void> = async (services, book) => {
  await services.books.deleteBook(book.id)
}

addRoute({
  auth: false,
  method: 'delete',
  route: '/book/:id',
  func: deleteBook
})
