import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

export const REGISTER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $mobile: String!
    $postcode: String!
    $services: [ServiceEnum!]!
  ) {
    register(
      name: $name
      email: $email
      mobile: $mobile
      postcode: $postcode
      services: $services
    ) {
      id
      name
      email
      mobile
      postcode
      services {
        id
        name
      }
    }
  }
`;

interface LeadFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export function LeadForm({ setShowForm }: LeadFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    postcode: '',
    services: [] as string[],
  });

  const [register, { loading, error }] = useMutation(REGISTER, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          leads(existingLeads = []) {
            const newLeadRef = cache.writeFragment({
              data: data.register,
              fragment: gql`
                fragment NewLead on Lead {
                  id
                  name
                  email
                  mobile
                  postcode
                  services {
                    id
                    name
                  }
                }
              `,
            });
            return [...existingLeads, newLeadRef];
          },
        },
      });
    },
  });

  const handleCheckbox = (service: string) => {
    setForm((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (!form.name || !form.email || !form.mobile || !form.postcode || form.services.length === 0) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill out all fields and select at least one service.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    // Optional: simple format checks (you can improve with regex if needed)
    if (!/^\d{11}$/.test(form.mobile)) {
      Swal.fire({
        title: 'Invalid Mobile',
        text: 'Mobile number must be exactly 11 digits.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    if (!/^\d{4}$/.test(form.postcode)) {
      Swal.fire({
        title: 'Invalid Postcode',
        text: 'Postcode must be exactly 4 digits.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save this lead?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'Cancel',
    });
  
    if (!confirm.isConfirmed) return;
  
    try {
      await register({ variables: form });
  
      Swal.fire({
        title: 'Lead Submitted!',
        text: 'Your lead was successfully saved.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      
      setShowForm(false)
  
      // Clear the form
      setForm({
        name: '',
        email: '',
        mobile: '',
        postcode: '',
        services: [],
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Register Interest</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Postcode"
            value={form.postcode}
            onChange={(e) => setForm({ ...form, postcode: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={form.services.includes('DELIVERY')}
              onChange={() => handleCheckbox('DELIVERY')}
            />
            Delivery
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.services.includes('PICK_UP')}
              onChange={() => handleCheckbox('PICK_UP')}
            />
            Pick-up
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.services.includes('PAYMENT')}
              onChange={() => handleCheckbox('PAYMENT')}
            />
            Payment
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <br />
        <br />
        <button className="close-btn" onClick={() => setShowForm(false)}>Close</button>
      </form>
      {error && <p className="error-message">{`Error: ${error.message}`}</p>}
    </>
  );
}
