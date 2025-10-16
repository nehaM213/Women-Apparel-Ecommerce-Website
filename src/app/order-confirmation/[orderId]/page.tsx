import { connectToMongoDb } from '@/lib/db';
import Order from '@/lib/models/order';
import OrderConfirmation from '@/components/OrderConfirmation';

type PageProps = {
  params: Promise<{ orderId: string }>
};

export default async function Page({ params }: PageProps) {
  const { orderId } = await params;

  await connectToMongoDb();

  let order: any = null;
  try {
    order = await Order.findById(orderId).lean();
  } catch (_e) {
    order = null;
  }

  if (!order) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Order not found</h1>
          <p className="text-muted-foreground">We couldn't find an order for the provided reference.</p>
        </div>
      </div>
    );
  }

  const normalizedOrder = {
    id: order._id?.toString?.() || String(order._id),
    status: order.status,
    subtotal: order.subtotal,
    createdAt: order.createdAt?.toString?.() || undefined,
    email: order.email || undefined,
    address: order.address || undefined,
    items: Array.isArray(order.items) ? order.items.map((it: any) => ({
      productId: it.productId,
      title: it.title,
      price: it.price,
      quantity: it.quantity,
      image: it.image,
      slug: it.slug,
      type: it.type,
      collectionType: it.collectionType,
    })) : [],
  };

  return <OrderConfirmation order={normalizedOrder} />;
}
