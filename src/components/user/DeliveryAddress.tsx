"use client"
import React, { useState } from 'react';
import AddAddressModal from './AddAddressModal';

type Address = {
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  company?: string;
  postalCode?: string;
  contactNumber?: string;
  city?: string;
  country?: string;
  default?: boolean;
  _id?: string;
};

type DeliveryAddressProps = {
  addresses: Address[];
};

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ addresses: initialAddresses }) => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState<Address | null>(null);

  const handleAddAddress = async (address: Address) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/user/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address),
      });
      const data = await res.json();
      if (res.ok && data.addresses) {
        setAddresses(data.addresses);
      } else {
        setError(data.error || 'Failed to add address');
      }
    } catch (err) {
      setError('Failed to add address');
    }
    setLoading(false);
  };

  const handleEditAddress = (address: Address) => {
    setEditAddress(address);
    setShowForm(true);
  };

  const handleUpdateAddress = async (address: Address) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/user/address', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address),
      });
      const data = await res.json();
      if (res.ok && data.addresses) {
        setAddresses(data.addresses);
      } else {
        setError(data.error || 'Failed to update address');
      }
    } catch (err) {
      setError('Failed to update address');
    }
    setLoading(false);
    setEditAddress(null);
  };

  const handleModalClose = () => {
    setShowForm(false);
    setEditAddress(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Addresses</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {addresses.map((address, idx) => (
          <div key={idx} className="border rounded p-4 relative bg-white shadow">
            {address.default && (
              <span className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Default
              </span>
            )}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-blue-500"
              onClick={() => handleEditAddress(address)}
              aria-label="Edit Address"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 1 1 2.828 2.828L11.828 15.828a4 4 0 0 1-1.414.828l-4.243 1.415 1.415-4.243a4 4 0 0 1 .828-1.414z"/></svg>
            </button>
            <div className="font-semibold">{address.firstName} {address.lastName}</div>
            <div>{address.company}</div>
            <div>{address.addressLine1}</div>
            <div>{address.addressLine2}</div>
            <div>{address.city}, {address.country} {address.postalCode}</div>
            <div>Contact: {address.contactNumber}</div>
          </div>
        ))}
      </div>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowForm(true)}
        disabled={loading}
      >
        Add New Address
      </button>
      <AddAddressModal
        open={showForm}
        onClose={handleModalClose}
        onAddAddress={editAddress ? handleUpdateAddress : handleAddAddress}
        initialData={editAddress || undefined}
      />
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

export default DeliveryAddress;