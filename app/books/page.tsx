import { CreateBook } from '@/backend/books.types.js'
import { pikku } from '@/pikku-nextjs.js'
import { BookList } from '@/components/BookList.js'
import { revalidatePath } from 'next/cache.js'

async function addBook(book: CreateBook) {
  'use server'
  await pikku().post(
    '/book',
    book
  )
  revalidatePath('/')
}

async function deleteBook(id: string) {
  'use server'
  await pikku().del(
    '/book/:id',
    { id }
  )
  revalidatePath('/')
}

export default async function BooksPage() {
  const books = await pikku().staticGet(
    '/books'
  )
  return <BookList books={books} addBook={addBook} deleteBook={deleteBook}/>
}
