import Checkout from '@/components/Checkout'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import User from '@/models/User'
import { connectToMongoDb } from '@/lib/db'

const page = async () => {
  await connectToMongoDb();
  const session = await getServerSession(authOptions);
  let addresses: any[] = [];
  if (session && session.user?.email) {
    const dbUser = await User.findOne({ email: session.user.email }).select('addresses').lean();
    if (dbUser && !Array.isArray(dbUser) && dbUser.addresses) {
      addresses = dbUser.addresses.map((addr: any) => ({
        ...addr,
        _id: addr._id?.toString?.() || undefined,
      }));
    }
  }
  return (
    <Checkout initialAddresses={addresses} />
  )
}

export default page