import { books } from '../fakeData';

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        getAllBooks() {
            // if you had a database, you would access it here
            return books;
        },
    },
    Mutation: {
        createBook(parent: any, args: any) {
            const newBook = args
            books.push(newBook)
            return newBook
        }
    }
};