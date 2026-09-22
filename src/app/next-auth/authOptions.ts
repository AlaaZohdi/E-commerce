import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
    providers:[
        Credentials ({
            name :'myLogin',
            credentials:{
                email:{label:'Email' ,type:'email' ,placeholder:'enter your email'},
                password:{label:'Password' ,type:'Password' ,placeholder:'enter your Password'},
            },
           async authorize (Credentials){
            // call api ,navigate user to home or error page
             const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin' ,{
        method:'POST',
        body:JSON.stringify({
            email:Credentials?.email,
            password:Credentials?.password
        }),
        headers:{
          'content-type':'application/json '
        }
      })
      if (!response.ok){
        throw new Error(response.statusText)
      }
      const payload =await response.json();
      const userData:{id:string} = jwtDecode(payload.token);
      
      console.log(payload);
      
            return {
                id:'',
                email:payload.user.email,
                name:payload.user.name,
                token:payload.token
            };
           }
        })
    ] ,
    callbacks:{
        jwt({user ,token}){
            if(user){
                token.id=user.id
            token.token =user.token
            }
            
            return token
        },
        session({session ,token}){
            session.user.id =token.id
            
            return session

        }
    }
    ,
    pages:{
        signIn:'/login'
    }

};