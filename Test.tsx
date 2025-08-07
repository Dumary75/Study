

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

const potter: Book = {
    title: 'potter',
    author: 'marks',
    isbn: '1213',
    category: BookCategory.Fiction,
    available: true
};

const ww2: Book = {
  title: 'ww2',
  author: 'historac',
  isbn: '1945',
  category: BookCategory.History,
  available: true
};

let books: Book[] = [potter,ww2];

const Eddy: User = {
  name: 'Eddy',
  userId: 75,
  borrowedBooks: []
};


function findItemByTitle<T extends { title: string }>(Title: string, books: T[]) {
  const foundBook = books.find(book => book.title === Title);
  if(foundBook){
    console.log(`Treffer: ${foundBook}!`)
        return foundBook;
  } else {
    console.log('Kein Treffer!')
    return null;
  };
};

class Library {

  addBook(book: Book): void{
    books.push(book);
  };

  getAvailableBooks(){
    if(books.length > 0){
      books.forEach((book) => console.log(book.title));
    } else {console.log('No books found!')};

  };

  borrowBook(isbn: string, user: User): void {
      const foundBook = books.find(book => book.isbn === isbn);
      if(foundBook){
        if(foundBook?.available === true){
          user.borrowedBooks.push(foundBook);
          foundBook.available = false;
          console.log(`${foundBook.title} wurde an ${user.name} ausgeliehen!`);
        } else {
          console.log(`${foundBook.title} ist nicht verfügbar!`)
        }
      } else {console.log('Buch wurde nicht gefunden!')}
  };

  returnBook(isbn: string, user: User): void {
      const foundBook = books.find(book => book.isbn === isbn);
      if(foundBook){
          if(foundBook.available === false){
            user.borrowedBooks = user.borrowedBooks.filter(foundBook => !foundBook);
            foundBook.available = true;
            console.log(`${foundBook.title} wurde von ${user.name} zurückgegeben!`);
          } else{console.log(`${foundBook.title} wurde bereits zurückgegeben!`)};
        } 
       else {console.log('Buch wurde nicht gefunden!')}
  };

  getBooksByCategory(category: BookCategory,books: Book[]){
    const foundBook = books.find(book => book.category === category);
      if(foundBook){
        console.log(`Treffer: ${foundBook.category}!`)
            return foundBook;
      } else {
        console.log('Kein Treffer!')
        return null;
  }
  }
};


const BookChanger = new Library;

BookChanger.borrowBook('1945',Eddy);
BookChanger.returnBook('1945',Eddy);
BookChanger.getBooksByCategory(BookCategory.Fiction,books);
BookChanger.returnBook('1945',Eddy);





