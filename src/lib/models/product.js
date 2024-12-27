import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
  url: { type: String, default: "" },
});

const productSchema = new mongoose.Schema({
  wp_id: { type: Number, required: true, default: 0 },
  title: { type: String, required: true },
  product_slug: { type: String, required: true, unique: true },
  price: { type: String },
  quantity: { type: Number },
  description: { type: String },
  categories: [{ type: string }],
  product_images: [productImageSchema],
  material: { type: String },
  wash_care: { type: String },
  date_created: { type: Date, default: new Date() },
  date_modified: { type: Date, default: new Date() },
  total_sales: { type: Number },
});

export const Product =
  mongoose.models["products"] || mongoose.model("products", productSchema);
