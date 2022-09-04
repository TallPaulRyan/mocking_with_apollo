import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    # Types
    type Book {
        title: String!
        author: String!
    }

    # Queries
    type Query {
        getAllBooks: [Book!]!
    }

    # Mutations
    type Mutation {
        createBook(title: String!, author: String!): Book!
    }
 `