import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000', // your GraphQL server
  cache: new InMemoryCache(),
});
