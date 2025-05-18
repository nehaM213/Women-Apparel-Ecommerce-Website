import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'; // Import the necessary components

export const Users = () => {
  // Dummy user list
  const users = [
    { id: 1, username: 'User1', email: 'user1@example.com' },
    { id: 2, username: 'User2', email: 'user2@example.com' },
    { id: 3, username: 'User3', email: 'user3@example.com' },
  ];

  return (
    <div>
      <h1>Users</h1>
      {/* Displaying the user list in a table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}