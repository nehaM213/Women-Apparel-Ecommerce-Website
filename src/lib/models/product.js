import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
  url: { type: String, default: "" },
});

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  product_slug: { type: String, required: true, unique: true },
  price: { type: String },
  quantity: { type: Number },
  description: { type: String },
  category: categorySchema, // Use the category schema here
  collections: [{ type: String }],
  product_images: [productImageSchema],
  material: { type: String },
  wash_care: { type: String },
  date_created: { type: Date, default: new Date() },
  date_modified: { type: Date, default: new Date() },
  total_sales: { type: Number },
});

export const Product =
  mongoose.models["products"] || mongoose.model("products", productSchema);
