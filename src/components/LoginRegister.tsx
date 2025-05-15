"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from './ui/button';

const LoginRegister: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login or registration logic here
    if (isLogin) {
      // Perform login
      console.log('Logging in with:', { email, password });
      // Redirect to home or dashboard after successful login
      router.push('/');
    } else {
      // Perform registration
      console.log('Registering with:', { name, email, password });
      // Redirect to login or home after successful registration
      router.push('/login');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {!isLogin && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <Button
          type="submit"
          className="mt-4 w-full"
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
        <Button
          onClick={() => setIsLogin(!isLogin)}
          variant="link"
          className="underline p-0 ml-2"
        >
          {isLogin ? 'Register' : 'Login'}
        </Button>
      </p>
    </div>
  );
};

export default LoginRegister;
