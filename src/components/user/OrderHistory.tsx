"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type OrderItem = {
  productId: string
  title: string
  price: number
  quantity: number
  image?: string
  slug?: string
  type?: string
  collectionType?: string
}

type Order = {
  id: string
  status: string
  subtotal: number
  createdAt?: string
  items: OrderItem[]
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let isMounted = true
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/order', { cache: 'no-store' })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data?.error || 'Failed to load orders')
        }
        if (isMounted) setOrders(Array.isArray(data.orders) ? data.orders : [])
      } catch (e: any) {
        if (isMounted) setError(e?.message || 'Failed to load orders')
      }
    }
    fetchOrders()
    return () => { isMounted = false }
  }, [])

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Order history</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (orders === null) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white shadow rounded p-4">
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Order history</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded shadow p-6 text-center">
            <p className="text-muted-foreground">You have no orders yet.</p>
            <div className="mt-4">
              <Link href="/" className="inline-block w-full sm:w-auto border rounded px-4 py-2 hover:bg-gray-50">Continue shopping</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[65vh] sm:max-h-[70vh] lg:max-h-[75vh] overflow-auto pr-1" aria-label="Order history list">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded shadow p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold break-all">Order #{order.id}</p>
                    {order.createdAt && (
                      <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                    )}
                  </div>
                  <div className={`px-2.5 py-1 rounded text-xs font-medium ${order.status === 'paid' ? 'bg-green-100 text-green-800' : order.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={`${order.id}-${item.productId}-${item.slug}`} className="flex items-center gap-3">
                      {item.image ? (
                        <Image src={item.image} alt={item.title} width={64} height={64} className="rounded w-16 h-16 object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium truncate text-sm sm:text-base">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="font-semibold">Subtotal: ₹{order.subtotal.toFixed(2)}</p>
                  <div className="grid grid-cols-1 sm:auto-cols-max sm:grid-flow-col gap-2 w-full sm:w-auto">
                    <Link href={`/order-confirmation/${order.id}`} className="text-sm text-center border rounded px-3 py-2 hover:bg-gray-50">View details</Link>
                    <Link href="/" className="text-sm text-center bg-black text-white rounded px-3 py-2 hover:bg-gray-800">Shop again</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory