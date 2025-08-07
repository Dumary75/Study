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
var books = [];
var potter = {
    title: 'potter',
    author: 'marks',
    isbn: '1213',
    category: BookCategory.Fiction,
    available: true
};
books.push(potter);
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
}
findItemByTitle('test', books);
findItemByTitle('potter', books);
