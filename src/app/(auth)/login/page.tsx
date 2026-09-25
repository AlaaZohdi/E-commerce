"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import img1 from '../../images/assortment-citrus-fruits.png'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Truck,
  ShieldCheck,
  Clock,
  ShieldCheckIcon,
  Users,
  Star,
} from "lucide-react";
import { Field, FieldLabel ,FieldDescription,FieldError} from "@/components/ui/field";
import { Input  } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schema/loginSchema";
import * as zod from "zod";
import { toast } from "@/components/ui/toast"
import { useRouter } from 'next/navigation'; 
// import { userLogin } from "@/api/actions/auth.actions";
import { signIn } from 'next-auth/react';
export type loginData=zod.infer<typeof loginSchema>



export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { control ,handleSubmit }= useForm<zod.infer<typeof loginSchema>>({
    defaultValues:{
    "email":"",
    "password":"",

    },resolver:zodResolver(loginSchema)
  })
  async function submitForm(data:zod.infer<typeof loginSchema>){
  const isLogin=  await signIn('credentials',{...data ,redirect:false})
    
//     const isLogin = await userLogin(data);

//     console.log(isLogin);
    if(isLogin?.ok){
      //succes 
      toast.add({
  type: "success",
  description: "user Loged In" ,
})
      //navigate
      router.push('/');
      
    }
    else{
      //error
      toast.add({
  type: "error",
  description: "cant log in " ,
})
    }
    
   
  }
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left side - Illustration */}
      <div className="hidden flex-col items-center justify-center bg-white px-12 py-16 lg:flex">
        <div className="relative mb-8 h-80 w-full max-w-md overflow-hidden rounded-2xl bg-gray-50">
          <Image
            src={img1}
            alt="Fresh groceries cart"
            fill
            className="object-cover "
          />
        </div>

        <h1 className="mb-4 max-w-md text-center text-3xl font-extrabold leading-snug text-gray-900">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h1>

        <p className="mb-6 max-w-sm text-center text-gray-500">
          Join thousands of happy customers who trust FreshCart for their
          daily grocery needs
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-primary" />
            Free Delivery
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary" />
            Secure Payment
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            24/7 Support
          </div>
        </div>
      </div>

      {/* Right side -  form */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-12 lg:bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-2 text-center">
            <span className="text-3xl font-extrabold">
              <span className="text-primary">Fresh</span>
              <span className="text-gray-900">Cart</span>
            </span>
          </div>

          <h2 className="mb-1 text-center text-2xl font-bold text-gray-900">
            Welcome Again!
          </h2>

          <p className="mb-8 text-center text-sm text-gray-500">
            Log In to use your fresh shopping experience
          </p>

          {/* Social buttons */}
          <div className="mb-4 space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <GoogleIcon />
              Continue with Google
            </button>

            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <FacebookIcon />
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">
              OR CONTINUE WITH EMAIL
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
            {/* name */}
            <div className="flex flex-col gap-3">

           <Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}> Email</FieldLabel>
<Input
  {...field}
  id={field.name}
  aria-invalid={fieldState.invalid}
  placeholder="Enter your Email"
  autoComplete="off"
  className="h-12 rounded-xl border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus-visible:ring-primary/10"
/>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

 <Controller
  name="password"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}> Password</FieldLabel>
<Input
  {...field}
  id={field.name}
  type='password'
  aria-invalid={fieldState.invalid}
  placeholder="Enter password"
  autoComplete="off"
  className="h-12 rounded-xl border-gray-200 bg-white px-4 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 focus-visible:ring-primary/10"
/>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
 
          
            </div>           

    

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Log In
            </button>
          </form>

              <Link href='/forgotPassword' 
              className='hover:text-primary'>Forget Password ?</Link>


          <p className="mt-6 text-center text-sm text-gray-600">
             New to FreshCart?{" "}
            <Link href="/login" className="font-semibold text-primary hover:opacity-80">
               Sign Up Now
            </Link>
          </p>

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheckIcon size={14} />
              SSL Secured
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              50K+ Users
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} />
              4.9 Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.27A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.62l4 3.1c.95-2.85 3.6-4.97 6.73-4.97z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z"
      />
    </svg>
  );
}

 {/* Password */}
            {/* <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-800">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:opacity-80"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-sm text-gray-800 outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div> */}
