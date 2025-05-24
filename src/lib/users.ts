type User = {
    id: number;
    identifier: string;
  };
  
  const users: User[] = [];
  
  export async function getUserByIdentifier(identifier: string): Promise<User | undefined> {
    return users.find((u) => u.identifier === identifier);
  }
  
  export async function createUser(identifier: string): Promise<User> {
    const user: User = {
      id: Date.now(),
      identifier,
    };
  
    users.push(user);
    return user;
  }
  