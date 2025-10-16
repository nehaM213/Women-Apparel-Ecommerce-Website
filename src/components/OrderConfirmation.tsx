import Image from 'next/image';
import Link from 'next/link';

type OrderItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
  type?: string;
  collectionType?: string;
};

type Address = {
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  company?: string;
  postalCode?: string;
  contactNumber?: string;
  city?: string;
  country?: string;
};

type OrderData = {
  id: string;
  status: 'pending' | 'paid' | 'failed' | string;
  subtotal: number;
  createdAt?: string;
  email?: string;
  address?: Address;
  items: OrderItem[];
};

type Props = {
  order: OrderData;
};

export default function OrderConfirmation({ order }: Props) {
  const isPaid = order.status === 'paid';

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-5 sm:p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{isPaid ? 'Thank you for your order!' : 'Order received'}</h1>
              <p className="text-muted-foreground mt-1">Order ID: {order.id}</p>
              {order.createdAt && (
                <p className="text-sm text-muted-foreground">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
              )}
            </div>
            <div className={`px-3 py-1 rounded text-sm font-medium ${isPaid ? 'bg-green-100 text-green-800' : order.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {order.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-md rounded-lg p-5 sm:p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Items</h2>
              <ul className="divide-y">
                {order.items.map((item) => (
                  <li key={`${item.productId}-${item.slug}`} className="flex items-center gap-4 py-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-md w-16 h-16 md:w-20 md:h-20 object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded flex-shrink-0" />
                    )}
                    <div className="flex-grow min-w-0">
                      <p className="font-medium truncate text-sm sm:text-base">{item.title}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      {item.slug && (
                        <Link href={`/${item.type}/collection/${item.collectionType}/${item.slug}`} className="text-sm text-blue-600 hover:underline">
                          View product
                        </Link>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm sm:text-base">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {order.address && (
              <div className="bg-white shadow-md rounded-lg p-5 sm:p-6">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Delivery Address</h2>
                <div className="text-sm sm:text-base">
                  <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.addressLine1}</p>
                  {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                  <p>{order.address.city}, {order.address.country} {order.address.postalCode}</p>
                  {order.address.contactNumber && <p>Contact: {order.address.contactNumber}</p>}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-5 sm:p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-semibold">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-4">Includes all applicable taxes.</div>
              <div className="grid grid-cols-1 gap-2">
                <Link href="/" className="w-full">
                  <div className="w-full text-center border rounded py-2 hover:bg-gray-50">Continue shopping</div>
                </Link>
                <Link href="/user/order-history" className="w-full">
                  <div className="w-full text-center bg-black text-white rounded py-2 hover:bg-gray-800">View orders</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


