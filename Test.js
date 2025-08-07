var BookCategory;
(function (BookCategory) {
    BookCategory[BookCategory["Fiction"] = 0] = "Fiction";
    BookCategory[BookCategory["NonFiction"] = 1] = "NonFiction";
    BookCategory[BookCategory["Science"] = 2] = "Science";
    BookCategory[BookCategory["History"] = 3] = "History";
})(BookCategory || (BookCategory = {}));
;
;
;
var potter = {
    title: 'potter',
    author: 'marks',
    isbn: '1213',
    category: BookCategory.Fiction,
    available: true
};
var ww2 = {
    title: 'ww2',
    author: 'historac',
    isbn: '1945',
    category: BookCategory.History,
    available: true
};
var books = [potter, ww2];
var Eddy = {
    name: 'Eddy',
    userId: 75,
    borrowedBooks: []
};
function findItemByTitle(Title, books) {
    var foundBook = books.find(function (book) { return book.title === Title; });
    if (foundBook) {
        console.log("Treffer: ".concat(foundBook, "!"));
        return foundBook;
    }
    else {
        console.log('Kein Treffer!');
        return null;
    }
    ;
}
;
var Library = /** @class */ (function () {
    function Library() {
    }
    Library.prototype.addBook = function (book) {
        books.push(book);
    };
    ;
    Library.prototype.getAvailableBooks = function () {
        if (books.length > 0) {
            books.forEach(function (book) { return console.log(book.title); });
        }
        else {
            console.log('No books found!');
        }
        ;
    };
    ;
    Library.prototype.borrowBook = function (isbn, user) {
        var foundBook = books.find(function (book) { return book.isbn === isbn; });
        if (foundBook) {
            if ((foundBook === null || foundBook === void 0 ? void 0 : foundBook.available) === true) {
                user.borrowedBooks.push(foundBook);
                foundBook.available = false;
                console.log("".concat(foundBook.title, " wurde an ").concat(user.name, " ausgeliehen!"));
            }
            else {
                console.log("".concat(foundBook.title, " ist nicht verf\u00FCgbar!"));
            }
        }
        else {
            console.log('Buch wurde nicht gefunden!');
        }
    };
    ;
    Library.prototype.returnBook = function (isbn, user) {
        var foundBook = books.find(function (book) { return book.isbn === isbn; });
        if (foundBook) {
            if (foundBook.available === false) {
                user.borrowedBooks = user.borrowedBooks.filter(function (foundBook) { return !foundBook; });
                foundBook.available = true;
                console.log("".concat(foundBook.title, " wurde von ").concat(user.name, " zur\u00FCckgegeben!"));
            }
            else {
                console.log("".concat(foundBook.title, " wurde bereits zur\u00FCckgegeben!"));
            }
            ;
        }
        else {
            console.log('Buch wurde nicht gefunden!');
        }
    };
    ;
    Library.prototype.getBooksByCategory = function (category, books) {
        var foundBook = books.find(function (book) { return book.category === category; });
        if (foundBook) {
            console.log("Treffer: ".concat(foundBook.category, "!"));
            return foundBook;
        }
        else {
            console.log('Kein Treffer!');
            return null;
        }
    };
    return Library;
}());
;
var BookChanger = new Library;
BookChanger.borrowBook('1945', Eddy);
BookChanger.returnBook('1945', Eddy);
BookChanger.getBooksByCategory(BookCategory.Fiction, books);
BookChanger.returnBook('1945', Eddy);
