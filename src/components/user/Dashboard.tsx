'use client';

import React from 'react';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  // Sample static data for demonstration
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    orders: [
      { id: '1', date: '2023-01-01', totalAmount: 99.99, status: 'Completed' },
      { id: '2', date: '2023-02-15', totalAmount: 49.99, status: 'Pending' },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        {user.orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{format(new Date(order.date), 'MM/dd/yyyy')}</td>
                  <td className="py-2 px-4 border-b">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
