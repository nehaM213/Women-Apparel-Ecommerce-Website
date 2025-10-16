import { NextResponse } from 'next/server';
import { connectToMongoDb } from '@/lib/db';
import Order from '@/lib/models/order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    await connectToMongoDb();
    const session: any = await getServerSession(authOptions as any);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user._id || session.user.id || undefined;
    const email = session.user.email || undefined;

    const query: any = {};
    if (userId) {
      query.userId = userId;
    } else if (email) {
      query.email = email;
    } else {
      return NextResponse.json({ orders: [] });
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .lean();

    const normalized = orders.map((o: any) => ({
      id: o._id?.toString?.() || String(o._id),
      status: o.status,
      subtotal: o.subtotal,
      createdAt: o.createdAt,
      items: Array.isArray(o.items)
        ? o.items.map((it: any) => ({
            productId: it.productId,
            title: it.title,
            price: it.price,
            quantity: it.quantity,
            image: it.image,
            slug: it.slug,
            type: it.type,
            collectionType: it.collectionType,
          }))
        : [],
    }));

    return NextResponse.json({ orders: normalized });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToMongoDb();
    const session: any = await getServerSession(authOptions as any);

    const body = await req.json();
    const { items, subtotal, address } = body || {};
    if (!Array.isArray(items) || typeof subtotal !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = await Order.create({
      userId: session?.user?._id || session?.user?.id || undefined,
      email: session?.user?.email || undefined,
      address: address || undefined,
      items: items.map((it: any) => ({
        productId: it.id || it.productId,
        title: it.title,
        price: it.price,
        quantity: it.quantity,
        image: Array.isArray(it.images) ? it.images[0] : it.image,
        slug: it.slug,
        type: it.type,
        collectionType: it.collectionType,
      })),
      subtotal,
      status: 'pending',
      paymentProvider: 'razorpay',
    });

    return NextResponse.json({ success: true, orderId: order._id, order });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
} 