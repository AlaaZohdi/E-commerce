'use client'
import { addToCart } from '@/api/actions/cartActions/addToCart'
import React, { ReactNode } from 'react'
import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from '@tanstack/react-query';


export default function AddBtn( {cls , child ,prodID} :{cls:string , child:ReactNode ,prodID:string}) {
async function  handleAddToCart(){
mutate(prodID)
}
  const query = useQueryClient()

const {data ,mutate} =useMutation({
  mutationFn:addToCart,
  onSuccess:()=>{
     toast.add({
  type: "success",
  description: "product Added Successfully to yout Cart" ,
})
   query.invalidateQueries({
        queryKey:['getCart']
      })

  },
  onError:()=>{
    toast.add({
  type: "error",
  description: "Login first" ,
})

  }
})
  return (

    <>
    <button onClick={handleAddToCart}  className= {cls}>
              {child}
            </button>
    </>
  )
}
