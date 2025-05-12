import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Swal from 'sweetalert2';
import { LeadForm, REGISTER } from '../components/LeadForm';

const mockSetShowForm = jest.fn();

const renderForm = () =>
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <LeadForm setShowForm={mockSetShowForm} />
    </MockedProvider>
  );

describe('LeadForm', () => {
  it('renders the form fields', () => {
    renderForm();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mobile')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Postcode')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows validation error when submitting empty form', async () => {
    renderForm();

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Validation Error',
        text: 'Please fill out all fields and select at least one service.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    });
  });

  it('shows error for invalid mobile and postcode', async () => {
    renderForm();

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mobile'), { target: { value: '123' } }); // Invalid
    fireEvent.change(screen.getByPlaceholderText('Postcode'), { target: { value: '12' } }); // Invalid
    fireEvent.click(screen.getByLabelText('Delivery')); // Select at least one service

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Invalid Mobile',
        text: 'Mobile number must be exactly 11 digits.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  });

  it('submits correctly with valid data', async () => {
    const mockMutation = {
      request: {
        query: REGISTER,
        variables: {
          name: 'John Doe',
          email: 'john@example.com',
          mobile: '04123456789',
          postcode: '1234',
          services: ['DELIVERY'],
        },
      },
      result: {
        data: {
          register: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            mobile: '04123456789',
            postcode: '1234',
            services: [{ id: '1', name: 'Delivery' }],
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[mockMutation]} addTypename={false}>
        <LeadForm setShowForm={mockSetShowForm} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mobile'), { target: { value: '04123456789' } });
    fireEvent.change(screen.getByPlaceholderText('Postcode'), { target: { value: '1234' } });
    fireEvent.click(screen.getByLabelText('Delivery'));

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Lead Submitted!',
        text: 'Your lead was successfully saved.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      expect(mockSetShowForm).toHaveBeenCalledWith(false);
    });
  });
});
