import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from './schema/typedefs';
import { resolvers } from './schema/resolvers'

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
