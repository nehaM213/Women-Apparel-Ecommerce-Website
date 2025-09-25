"use client"
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';

const userEmail = 'nehamaurya213@gmail.com'; // Replace with prop or context if needed

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password.length < 6 || password.length > 40) {
      setError('Password must be between 6 and 40 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Password updated successfully!');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch (err) {
      setError('Failed to update password');
    }
    setLoading(false);
  };

  return (
    <div className="w-1/2 text-center">
      <div className="flex flex-col items-center mb-4">
        <FaLock size={40} className="mb-2" />
        <div className="text-lg font-medium mb-2">Update your password for</div>
        <div className="font-bold text-xl mb-4">{userEmail}</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="Password must be between 6 to 40 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="Re-enter the new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded mt-2 hover:bg-gray-800 disabled:opacity-60"
          disabled={loading}
        >
          Update password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;