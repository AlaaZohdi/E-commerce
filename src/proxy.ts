import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest){ 
    const protectedPages =['/cart' ,'/wishList'];
    const authPages =['/login' ,'/register'];
    // path
    const pathName =req.nextUrl.pathname
    //token
    const myToken =await getToken({
        req:req,
        secret:process.env.NEXTAUTH_SECRET,
        secureCookie:process.env.NODE_ENV ==='production',


    });
    const accessToken =myToken?.token;
    if(!accessToken &&  protectedPages.some((path)=>{
        return pathName.startsWith(path)
    })){
        return NextResponse.redirect( new URL('/login',req.nextUrl))
    }
    if(accessToken &&  authPages.some((path)=>{
        return pathName.startsWith(path)
    })){
        return NextResponse.redirect( new URL('/',req.nextUrl))
    }

    return NextResponse.next();

}
export const config ={
    matcher:[
        '/cart/:path*',
        '/wishList/:path*',
        '/login/:path*',
        '/register/:path*',
    ]
}