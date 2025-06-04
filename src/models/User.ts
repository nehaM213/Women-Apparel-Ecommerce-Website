import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: { type: String },
  role:{ type: String },
  createdAt: { type: Date, default: Date.now },
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
