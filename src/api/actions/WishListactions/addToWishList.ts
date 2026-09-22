'use server'
import { getTokenFun } from '@/utilities/getTokenData';


export async function addToWishList(prodID: string) {
  const token = await getTokenFun()
  if (!token) throw new Error('unauthorized')

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId: prodID }),
      headers: {
        token: token,
        'Content-type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('unauthorized')
    return await response.json()
  } catch (error) {
    throw new Error('unauthorized')
  }
}