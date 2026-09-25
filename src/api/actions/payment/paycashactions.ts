'use server'
import { getTokenFun } from "@/utilities/getTokenData"
import { checkoutSchema, CheckoutSchemaType } from '@/schema/checkoutSchema';

export async function payCash(
  cartId: string,
  shippingAddress:CheckoutSchemaType
) {
  const token = await getTokenFun()
  
  console.log("TOKEN:", token)
  console.log("CART ID:", cartId)

  if (!token) {
    throw new Error("No token found")
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      body: JSON.stringify({
        shippingAddress: shippingAddress,
      }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const payload = await response.json()

  console.log("STATUS:", response.status)
  console.log("PAYLOAD:", payload)

  if (!response.ok) {
    throw new Error(payload.message || "Order failed")
  }

  return payload
}