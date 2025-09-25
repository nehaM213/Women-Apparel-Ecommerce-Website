import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String },
  phone: { type: String },
  password: { type: String },
  role:{ type: String },
  image: { type: String },
  addresses: [{
    firstName: { type: String },
    lastName: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    postalCode: { type: String },
    contactNumber: { type: String },
    city: { type: String },
    country: { type: String },
    default: { type: Boolean, default: false },
  }],
  createdAt: { type: Date, default: Date.now },
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
