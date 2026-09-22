import { productType } from './../types/productType';

export async function getAllProducts ():Promise<productType[]|null>{
 try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');   
    if (!response.ok)throw new Error('API Error')
 const payload =await response.json();
 return payload.data;
 } catch (error) {
    console.log(error); 
    return null;
 }
}

export async function getSingleProduct (id:string){
 try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);   
    if (!response.ok)throw new Error('API Error')
 const payload =await response.json();
 return payload.data;
 } catch (error) {
    console.log('api error'); 
 }
}