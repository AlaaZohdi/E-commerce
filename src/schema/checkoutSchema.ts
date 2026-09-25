import { z } from "zod";

export const checkoutSchema = z.object({
  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City name is too short"),

  details: z
    .string()
    .min(1, "Street address is required")
    .min(5, "Please provide a more detailed address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),

  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^[0-9]{4,6}$/, "Enter a valid postal code"),

  paymentMethod: z.enum(["cash", "card"], {
    required_error: "Please select a payment method",
  }),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
