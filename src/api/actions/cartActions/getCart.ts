import { getTokenFun } from "@/utilities/getTokenData";

export async function getCart(){
  const token =await getTokenFun()

    if (!token){ throw new Error('unuthorized')}
 try {
       // get token 
  const response =await fetch('https://ecommerce.routemisr.com/api/v2/cart',{
    method:'GET',
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