import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER = gql`
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
    }
  }
`;

const Modal = ({ message, onClose, type }: { message: string, onClose: () => void, type: 'success' | 'error' }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <h2>{type === 'success' ? 'Success!' : 'Error'}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    postcode: '',
    services: [] as string[],
  });
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [register, { loading, error }] = useMutation(REGISTER);

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
    try {
      const { data } = await register({ variables: form });
      setModalMessage('Lead submitted successfully!');
      setModalType('success');
      setModalVisible(true);
    } catch (err) {
      setModalMessage('Something went wrong. Please try again.');
      setModalType('error');
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="lead-form">
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
              onChange={() => handleCheckbox('DELIVERY')}
            />
            Delivery
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckbox('PICK_UP')}
            />
            Pick-up
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckbox('PAYMENT')}
            />
            Payment
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p className="error-message">{`Error: ${error.message}`}</p>}

      {modalVisible && (
        <Modal message={modalMessage} onClose={closeModal} type={modalType} />
      )}
    </>
  );
}

