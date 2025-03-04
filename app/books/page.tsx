import { CreateBook } from '@/backend/books.types.js'
import { pikku } from '@/pikku-nextjs.js'
import { BookList } from '@/components/BookList.js'

async function addBook(book: CreateBook) {
  'use server'
  await pikku().actionRequest(
    '/book',
    'post',
    book
  )
}

async function deleteBook(id: string) {
  'use server'
  await pikku().actionRequest(
    '/book/:id',
    'delete',
    { id }
  )
}

export default async function BooksPage() {
  const books = await pikku().staticActionRequest(
    '/books',
    'get',
    null
  )

  return <BookList books={books} addBook={addBook} deleteBook={deleteBook}/>
}
