import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import '../css/LeadList.css';

const LEADS = gql`
  query {
    leads {
      id
      name
      email
      mobile
      postcode
      createdAt
      services {
        id
        name
      }
    }
  }
`;

interface NavbarProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeadList: React.FC<NavbarProps> = ({ setShowForm }) => {
  const { loading, error, data } = useQuery(LEADS);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // default to 10 per page

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  if (error) return <p className="error">Error loading leads: {error.message}</p>;

  const leads = data.leads;
  const totalPages = Math.ceil(leads.length / pageSize);
  const paginatedLeads = leads.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="lead-list-section">
      <button className="add-lead-button" onClick={() => setShowForm(true)}>
        + Add Lead
      </button>
      <br />
      <br />
      <hr />
      <br />
      <div className="lead-list-header">
        <h2 className="lead-list-title">All Leads</h2>
        <div className="pagination-controls">
          <label htmlFor="pageSize">Leads per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset to page 1 when changing page size
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="lead-list-table">
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
            {paginatedLeads.map((lead: any) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.mobile}</td>
                <td>{lead.postcode}</td>
                <td>{lead.services?.map((s: any) => s.name).join(', ') || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="pagination-info">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default LeadList;
