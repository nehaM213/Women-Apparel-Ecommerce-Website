import React, { useState, useEffect } from "react";

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

type AddAddressModalProps = {
  open: boolean;
  onClose: () => void;
  onAddAddress: (address: Address) => void;
  initialData?: Address;
};

const initialAddress: Address = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  company: "",
  postalCode: "",
  contactNumber: "",
  city: "",
  country: "",
  default: false,
};

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  open,
  onClose,
  onAddAddress,
  initialData,
}) => {
  const [formState, setFormState] = useState<Address>(initialAddress);

  useEffect(() => {
    if (initialData && open) {
      setFormState(initialData);
    } else if (open) {
      setFormState(initialAddress);
    }
  }, [initialData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setFormState((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAddress(formState);
    setFormState(initialAddress);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4">{initialData ? 'Edit Address' : 'Add New Address'}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border rounded px-2 py-1 flex-1"
              required
            />
            <input
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border rounded px-2 py-1 flex-1"
              required
            />
          </div>
          {/* <input
            name="company"
            value={formState.company}
            onChange={handleChange}
            placeholder="Company"
            className="border rounded px-2 py-1 w-full"
          /> */}
          <input
            name="addressLine1"
            value={formState.addressLine1}
            onChange={handleChange}
            placeholder="Address Line 1"
            className="border rounded px-2 py-1 w-full"
            required
          />
          <input
            name="addressLine2"
            value={formState.addressLine2}
            onChange={handleChange}
            placeholder="Address Line 2"
            className="border rounded px-2 py-1 w-full"
          />
          <div className="flex gap-2">
            <input
              name="city"
              value={formState.city}
              onChange={handleChange}
              placeholder="City"
              className="border rounded px-2 py-1 flex-1"
              required
            />
            <input
              name="country"
              value={formState.country}
              onChange={handleChange}
              placeholder="Country"
              className="border rounded px-2 py-1 flex-1"
              required
            />
          </div>
          <div className="flex gap-2">
            <input
              name="postalCode"
              value={formState.postalCode}
              onChange={handleChange}
              placeholder="Postal/Zip Code"
              className="border rounded px-2 py-1 flex-1"
              required
            />
            <input
              name="contactNumber"
              value={formState.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className="border rounded px-2 py-1 flex-1"
              required
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="default"
              checked={!!formState.default}
              onChange={handleChange}
            />
            Set as default
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {initialData ? 'Update Address' : 'Save Address'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
