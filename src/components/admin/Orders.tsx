import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'; // Import the necessary components

export const Orders = () => {
  // Dummy order list
  const orders = [
    { id: 1, customerName: 'Customer 1', totalAmount: 100 },
    { id: 2, customerName: 'Customer 2', totalAmount: 200 },
    { id: 3, customerName: 'Customer 3', totalAmount: 300 },
  ];

  return (
    <div>
      <h1>Orders</h1>
      {/* Displaying the order list in a table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>${order.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}