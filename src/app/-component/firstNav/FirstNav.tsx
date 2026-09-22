import React from 'react'
import { Car ,Gift ,Phone ,Mail ,UserStar ,User } from "lucide-react";
// todo : add liks and chek code
export default function FirstNav() {
  return (
    <div className=' w-full justify-between p-2 hidden lg:flex'>
   <div className='flex gap-7'>
     <div className='flex gap-2 text-primary'>
       <Car size={18} />
        <p className='text-secondary'>Free Shipping on Orders 500 EGP</p>
    </div>
    <div className='flex gap-2 text-primary'>
       <Gift size={18} />
        <p className='text-secondary'>New Arrivals Daily</p>
    </div>
   </div>

   <div className='flex gap-4'>
  <div className="flex gap-7">
    <a href="tel:+12345678001"className="flex gap-2 text-secondary transition-colors hover:text-primary">
    <Phone size={18} />
    <p>123-4567 (800) 1+</p></a>
  <a href="mailto:support@freshcart.com" className="flex gap-2 text-secondary transition-colors hover:text-primary">
    <Mail size={18} />
    <p>support@freshcart.com</p></a>
  </div>
  <div className='border-l-2 border-[#E5E7EB] flex gap-4 '>
    <div className='flex ml-3 text-secondary hover:text-primary'>
        <User size={18} />
        <link href="/login" /> Sing In
    </div>
     <div  className='flex text-secondary hover:text-primary'>
        <UserStar size={18} />
        <link href="/register" /> Sing Up
    </div>
  </div>
</div>

    </div>
  )
}
