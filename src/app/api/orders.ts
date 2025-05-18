import { NextApiRequest, NextApiResponse } from 'next';

const orders = [
  {
    id: '1',
    date: '2023-01-01T12:00:00Z',
    items: [
      { id: 'item1', title: 'Product 1', price: 29.99, quantity: 1 },
      { id: 'item2', title: 'Product 2', price: 19.99, quantity: 2 },
    ],
    totalAmount: 69.97,
  },
  {
    id: '2',
    date: '2023-02-15T12:00:00Z',
    items: [
      { id: 'item3', title: 'Product 3', price: 49.99, quantity: 1 },
    ],
    totalAmount: 49.99,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(orders);
}
