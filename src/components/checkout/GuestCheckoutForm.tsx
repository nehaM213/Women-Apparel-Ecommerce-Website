import React, { useState } from "react";

export type GuestCheckoutData = {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  createAccount: boolean;
};

type GuestCheckoutFormProps = {
  onSubmit: (data: GuestCheckoutData) => void;
};

const GuestCheckoutForm: React.FC<GuestCheckoutFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<GuestCheckoutData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    createAccount: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.email ||
      !form.firstName ||
      !form.lastName ||
      !form.addressLine1 ||
      !form.city ||
      !form.postalCode ||
      !form.country
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    // Basic email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded shadow max-h-[80vh] overflow-y-auto"
    >
      <h2 className="text-xl font-bold mb-2 text-center">Checkout as Guest</h2>
      <div>
        <label className="block mb-1 font-medium">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">
          Address Line 1<span className="text-red-500">*</span>
        </label>
        <input
          name="addressLine1"
          value={form.addressLine1}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Address Line 2</label>
        <input
          name="addressLine2"
          value={form.addressLine2}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium">
            City<span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">
            Postal Code<span className="text-red-500">*</span>
          </label>
          <input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">
          Country<span className="text-red-500">*</span>
        </label>
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="createAccount"
          checked={form.createAccount}
          onChange={handleChange}
        />
        Create an account with this email
      </label>
      {error && <div className="text-red-600 text-sm">nnnn{error}</div>}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default GuestCheckoutForm;
