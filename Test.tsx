

enum BookCategory {
    Fiction,
    NonFiction,
    Science,
    History
};


interface Book {
    title: string,
    author: string,
    readonly isbn: string,
    category: BookCategory,
    available: boolean
};

interface User {
    name: string,
    userId: number,
    borrowedBooks: Book[]
};

let books: Book[] = [];

const potter: Book = {
    title: 'potter',
    author: 'marks',
    isbn: '1213',
    category: BookCategory.Fiction,
    available: true
};

books.push(potter);

function findItemByTitle<T extends { title: string }>(Title: string, books: T[]) {
  const foundBook = books.find(book => book.title === Title);
  if(foundBook){
    console.log(`Treffer: ${foundBook}!`)
        return foundBook;
  } else {
    console.log('Kein Treffer!')
    return null;
  }
  
}


findItemByTitle('test', books);
findItemByTitle('potter', books);