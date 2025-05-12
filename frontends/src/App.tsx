import { useState } from 'react';
import { LeadForm } from './component/LeadForm';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Navbar from './component/Navbar';
import LeadList from './component/LeadList';


function App() {
  // Set up Apollo Client
  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Navbar/>
      <ApolloProvider client={client}>
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <LeadForm setShowForm={setShowForm}/>
            </div>
          </div>
        )}
        <LeadList setShowForm={setShowForm}/>
      </ApolloProvider>
    </>
  );
}

export default App;
