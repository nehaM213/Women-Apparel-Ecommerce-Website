"use client"
import Image from 'next/image';
import React, { useState } from 'react';

type User = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  image?: string;
  [key: string]: string | undefined;
};

type ProfileProps = {
  user: User;
  updateProfile: (formData: FormData) => Promise<any>;
};

const fields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email', disabled: true },
  { key: 'phone', label: 'Phone' },
  // { key: 'role', label: 'Role' },
  // { key: 'image', label: 'Image URL' },
];

const Profile: React.FC<ProfileProps> = ({ user, updateProfile }) => {
  const [editField, setEditField] = useState<string | null>(null);
  const [formState, setFormState] = useState<User>(user || {});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleEdit = (key: string) => setEditField(key);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    if (editField && formState[editField] !== undefined) {
      formData.append(editField, formState[editField] || '');
    }
    const res = await updateProfile(formData);
    if (res?.error) setMessage(res.error);
    else {
      setMessage('Profile updated!');
      // Update local state with the new value
      if (editField && res.user && res.user[editField] !== undefined) {
        setFormState(prev => ({
          ...prev,
          [editField]: res.user[editField]
        }));
      }
    }
    setEditField(null);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2 className="text-xl font-bold mb-4">Profile</h2> */}
      {formState.image && (
        <div className="mb-4 flex justify-start">
          <Image
            width={96}
            height={96}
            src={formState.image}
            alt="Profile Image"
            className="rounded-full border"
            style={{ width: 96, height: 96, objectFit: 'cover' }}
          />
        </div>
      )}
      {fields.map(({ key, label, disabled }) => (
        <div key={key} className="mb-4 flex items-start gap-3">
          <label className="font-medium">{label}:</label>
          {editField === key ? (
            <input
              name={key}
              value={formState[key as keyof User] || ''}
              onChange={handleChange}
              disabled={disabled}
              className="border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <span className="">{formState[key as keyof User] || ''}</span>
          )}
          {!disabled && (
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-blue-500"
              onClick={() => handleEdit(key)}
              disabled={!!editField && editField !== key}
              aria-label={`Edit ${label}`}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 1 1 2.828 2.828L11.828 15.828a4 4 0 0 1-1.414.828l-4.243 1.415 1.415-4.243a4 4 0 0 1 .828-1.414z"/></svg>
            </button>
          )}
          {editField === key && (
            <button type="submit" className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" disabled={loading}>
              Save
            </button>
          )}
        </div>
      ))}
      {message && <div className="text-green-600 mt-2">{message}</div>}
    </form>
  );
};

export default Profile;