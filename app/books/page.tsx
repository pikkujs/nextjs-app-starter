import { CreateBook } from '@/backend/books.types.js'
import { vramework } from '@/vramework-nextjs.js'
import { BookList } from '@/components/BookList.js'

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
