// schemas/addressSchema.ts
import { z } from "zod";

export const addressSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z
    .string()
    .min(5, "Postal code is required")
    .regex(/^\d{5,6}$/, "Postal code must be 5-6 digits"),
  contactNumber: z
    .string()
    .min(10, "Contact number is required")
    .regex(/^[0-9]{10}$/, "Enter a valid 10 digit mobile number"),
  default: z.boolean().optional(),
});
