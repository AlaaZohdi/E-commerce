import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest){
const token=await getToken({req:req});
if(!token) return NextResponse.json({message:'unaothrzed',
    satatus:401
})
       // get token 
  const response =await fetch('https://ecommerce.routemisr.com/api/v2/cart',{
    method:'GET',
    headers:{
        token :token.token,
        'Content-type':'application/json'
    }
  })

  if(!response.ok) return NextResponse.json({message:'unaothrzed' , satatus:401})
    const payload =await response.json();
    console.log(payload)
return NextResponse.json(payload);

}