import User from '@/models/User';
import { connectToMongoDb } from './db';

const isEmail = (identifier: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(identifier);
};

const isPhoneNumber = (identifier: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(identifier);
};

export async function getUserByIdentifier(identifier: string): Promise<typeof User | null> {
  await connectToMongoDb();
  console.log("finding");
  if (isEmail(identifier)) {
    return User.findOne({ email: identifier }).exec();
  } else if (isPhoneNumber(identifier)) {
    return User.findOne({ phone: identifier }).exec();
  }
  return null;
}

export async function createUser(identifier: string): Promise<typeof User> {
  await connectToMongoDb();
  console.log("creating");
  const userData = isEmail(identifier) ? { email: identifier,emailVerified: true  } : { phone: identifier, phoneVerified: true };
  const user = new User(userData);
  await user.save();
  return user;
}
  