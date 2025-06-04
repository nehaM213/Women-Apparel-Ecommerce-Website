'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import Profile from '@/components/user/Profile';

const page = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <h1>Hello! {session?.user?.name}</h1>
        <Profile />
    </div>
  )
}

export default page