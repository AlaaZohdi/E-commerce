import Image from "next/image";
import FeaturedProducts from './-component/FeaturedProducts/FeaturedProducts';
import PromoBanners from './-component/PromoBanners/PromoBanners';
import Newsletter from './-component/Newsletter/Newsletter';
import Slider from './-component/slider/Slider';
import img1 from '../assets/images/slider-image-1.jpeg'
import img2 from '../assets/images/banner-4.jpeg'
import img3 from '../assets/images/slider-2.jpeg'
import Loading from "./loading";
import dynamic from "next/dynamic";
const ShopCategory = dynamic(() => import('./-component/shopCategory/ShopCategory'),{loading:()=> <div>loading.....</div>});
export default function Home() {
  return (
   <div className="container mx-auto w-full">
    <Slider
  spaceBetween={0}
  slidesPerView={1}
  slides={[
    {
      image: img1.src,
      title: "Fast & Free Delivery",
      subtitle: "Same day delivery available",
      primaryButton: { text: "Order Now", href: "/" },
      secondaryButton: { text: "Delivery Info", href: "/" },
    },
    {
      image: img2.src,
      title: "Fresh Products Delivered to your Door",
      subtitle: "Get 20% off your first order",
      primaryButton: { text: "Shop Now", href: "/" },
      secondaryButton: { text: "View Deals", href: "/" },
    },
    {
      image: img3.src,
      title: "Premium Quality Guaranteed",
      subtitle: "Fresh from farm to your table",
      primaryButton: { text: "Shop Now", href: "/" },
      secondaryButton: { text: "Learn More", href: "/" },
    },
   
  ]}
/>
    <ShopCategory/>
    <PromoBanners/>
   <FeaturedProducts/>
   <Newsletter/>

   </div>
  );
}
