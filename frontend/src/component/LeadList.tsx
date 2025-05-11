import { gql, useQuery } from '@apollo/client';

const LEADS = gql`
  query {
    leads {
      id
      name
      email
      mobile
      postcode
      services
      createdAt
    }
  }
`;

export function LeadList() {
  const { loading, error, data } = useQuery(LEADS);

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error loading leads: {error.message}</p>;
  if (!data || !data.leads) return <p>No leads found.</p>;

  return (
    <div>
      <h2>All Leads</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Postcode</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {data.leads.map((lead: any) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.mobile}</td>
              <td>{lead.postcode}</td>
              <td>{lead.services.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
