import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers/leadResolvers';

export const server = new ApolloServer({ typeDefs, resolvers });
