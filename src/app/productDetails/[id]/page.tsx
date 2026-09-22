import { getSingleProduct } from '@/api/services/productsApi';
import ProductDetailsClient from './ProductDetailsClient';
import { notFound } from 'next/navigation';

type ProductDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;
  const product = await getSingleProduct(id); 

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}