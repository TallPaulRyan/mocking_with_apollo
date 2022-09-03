import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
    }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};

async function applyApolloMiddleware(expressApp: express.Express){
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: expressApp });
}

async function startServer() {
    const expressApp = express();
    applyApolloMiddleware(expressApp)
    expressApp.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    );
}

startServer();
