class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelf = [];
        this.shelfCapacity = shelfCapacity;
    }

    get room() {
        return this._room;
    }

    set room(newRoom) {
        if (!["livingRoom", "bedRoom", "closet"].includes(newRoom)) {
            throw new Error("Cannot have book shelf in " + newRoom);
        }
        this._room = newRoom;
    }

    addBook(bookName, bookAuthor, genre) {
        let book = {
            bookName: bookName,
            bookAuthor: bookAuthor
        };
        if (genre) {
            book.genre = genre;
        }
        if (this.shelf.length >= this.shelfCapacity) {
            this.shelf.shift();
        }
        this.shelf.push(book);
        this.shelf.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
        return this;
    }

    throwAwayBook(bookName) {
        this.shelf = this.shelf.filter(x => x.bookName !== bookName);
    }

    showBooks(genre) {
        let str = `Results for search \"${genre}\":`;
        let selectedBooks = this.shelf.filter(x => x.genre === genre);
        for (let b of selectedBooks) {
            str += `\n\uD83D\uDCD6 ${b.bookAuthor} - \"${b.bookName}\"`;
        }
        return str;
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    toString() {
        if (this.shelf.length === 0) {
            return "It's an empty shelf";
        }
        let str = `\"${this.shelfGenre}\" shelf in ${this.room} contains:`;
        for (let book of this.shelf) {
            str += `\n\uD83D\uDCD6 \"${book.bookName}\" - ${book.bookAuthor}`;
        }
        return str;
    }
}
