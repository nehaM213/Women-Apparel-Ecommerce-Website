import Profile from '@/components/user/Profile'
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToMongoDb } from '@/lib/db';
import User from '@/models/User';

type UserType = {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    image?: string;
    [key: string]: string | undefined;
  };

export default async function Page() {
  await connectToMongoDb();
  const session = await getServerSession(authOptions);
  let user: UserType | null = null;
  if (session && session.user?.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select('-password').lean() as UserType | null;
    if (dbUser) {
      user = {
        name: dbUser.name || '',
        email: dbUser.email || '',
        phone: dbUser.phone || '',
        role: dbUser.role || '',
        image: dbUser.image || '',
      };
    }
  }

  async function updateProfile(formData: FormData) {
    'use server';
    await connectToMongoDb();
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) return { error: 'Unauthorized' };
    const allowedFields = ['name', 'phone', 'role', 'image'];
    const updateData: any = {};
    for (const field of allowedFields) {
      if (formData.get(field) !== null) updateData[field] = formData.get(field);
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, select: '-password' }
    ).lean() as UserType | null;
    if (!updatedUser) return { error: 'User not found' };
    return { success: true, user: {
      name: updatedUser.name || '',
      email: updatedUser.email || '',
      phone: updatedUser.phone || '',
      role: updatedUser.role || '',
      image: updatedUser.image || '',
    }};
  }

  return <Profile user={user as UserType} updateProfile={updateProfile} />
}