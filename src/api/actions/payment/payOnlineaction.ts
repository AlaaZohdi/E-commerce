'use server'

import { getTokenFun } from "@/utilities/getTokenData"
import { checkoutSchema, CheckoutSchemaType } from '@/schema/checkoutSchema';


export async function payOnline(cartId:string ,shippingAddress:CheckoutSchemaType){
  const token =await getTokenFun()

    if (!token){ throw new Error('unuthorized')}
 try {
       // get token 
  const response =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
    method:'POST',
    body:JSON.stringify({
        shippingAddress:shippingAddress
    }),
    headers:{
        token :token,
        'Content-type':'application/json'
    }
  })

  if(!response.ok) throw new Error('unuthorized');
    const payload =await response.json();
    console.log(payload)
return payload;

    
 } catch (error) {
    throw new Error('unuthorized')
    
 }

}