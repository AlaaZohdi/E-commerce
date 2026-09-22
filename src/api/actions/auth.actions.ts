"use server"
import { loginData } from "@/app/(auth)/login/page";
import { userData } from "@/app/(auth)/register/page";
import { cookies } from "next/headers";

export async function userRegister(data:userData){
     try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup' ,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'content-type':'application/json '
        }
      })
      const payload =await response.json();
    //   return payload; noooooo wrong will come to browser !
    return response.ok
      
      
    } catch (error) {
      console.log(error);
    }
}

// export async function userLogin(data:loginData){
//      try {
//       const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin' ,{
//         method:'POST',
//         body:JSON.stringify(data),
//         headers:{
//           'content-type':'application/json '
//         }
//       })
//       const payload =await response.json();
//     //   return payload; noooooo wrong will come to browser !
//     if(response.ok){
//       const cookie =await cookies();
//       cookie.set('userToken',payload.token,{
//         httpOnly:true
//       })
//     }
//     return response.ok
      
      
//     } catch (error) {
//       console.log(error);
//     }
// }