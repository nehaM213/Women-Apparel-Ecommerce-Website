'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const [message, setMessage] = useState('Verifying...');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      fetch(`/api/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setMessage('Email verified successfully!');
          } else {
            setMessage('Invalid or expired token.');
          }
        });
    }
  }, [token]);

  return <div className="p-4 text-center">{message}</div>;
}
