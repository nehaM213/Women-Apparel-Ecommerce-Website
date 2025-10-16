import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: String,
  price: Number,
  quantity: Number,
  image: String,
  slug: String,
  type: String,
  collectionType: String,
}, { _id: false });

const AddressSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  addressLine1: String,
  addressLine2: String,
  company: String,
  postalCode: String,
  contactNumber: String,
  city: String,
  country: String,
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  email: { type: String, required: false },
  address: { type: AddressSchema, required: false },
  items: { type: [OrderItemSchema], required: true },
  subtotal: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  paymentProvider: { type: String, default: 'razorpay' },
  razorpayOrderId: { type: String, required: false },
  razorpayPaymentId: { type: String, required: false },
  razorpaySignature: { type: String, required: false },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema); 