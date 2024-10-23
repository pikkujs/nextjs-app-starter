import { CreateBook } from '@/backend/books.types'
import { vramework } from '@/vramework-nextjs'
import { BookList } from '@/components/BookList'

async function addBook(book: CreateBook) {
  'use server'
  await vramework().actionRequest(
    '/book',
    'post',
    book
  )
}

async function deleteBook(id: string) {
  'use server'
  await vramework().actionRequest(
    '/book/:id',
    'delete',
    { id }
  )
}

export default async function BooksPage() {
  const books = await vramework().staticActionRequest(
    '/books',
    'get',
    null
  )

  return <BookList books={books} addBook={addBook} deleteBook={deleteBook}/>
}
