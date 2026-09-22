import { getAllProducts } from '@/api/services/productsApi'
import React from 'react'
import { productType } from './../../../api/types/productType';
import ProductCard from './../ProductCard/ProductCard';

export default async function FeaturedProducts() {
const products = await getAllProducts();

  return (
    <div className= 'container mx-auto px-4 sm:px-8 lg:px-16 py-7'>
        <span className="h-7 w-1.5 rounded-full bg-primary" />
          <h2 className="text-2xl pb-7 font-bold text-gray-800 sm:text-3xl">
            Shop By <span className="text-primary">Category</span>
          </h2>
  <div className='grid grid-cols-4 gap-7 '>
    {products?.map((product:productType)=>{
       return <ProductCard product={product} key={product._id}/>
    })}
    
    </div>
    </div>
  )
}
