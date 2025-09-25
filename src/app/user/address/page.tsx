import DeliveryAddress from "@/components/user/DeliveryAddress";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/models/User';
import { connectToMongoDb } from '@/lib/db';

export default async function Address() {
    await connectToMongoDb();
    const session = await getServerSession(authOptions);
    let addresses = [];
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
        <DeliveryAddress addresses={addresses} />
    )
}