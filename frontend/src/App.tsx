import { LeadForm } from './component/LeadForm';
import { LeadList } from './component/LeadList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {
  // Set up Apollo Client
  const client = new ApolloClient({
    uri: 'https://your-graphql-endpoint', // Replace with your actual GraphQL endpoint
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Brighte Eats</h1>
        <br />
        <hr />
        <br />
        <LeadForm />
        <hr />
        <br />
        <LeadList />
      </div>
    </ApolloProvider>
  );
}

export default App;
