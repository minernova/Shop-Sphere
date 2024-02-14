import React, { Profiler } from 'react'
import { customFetch } from '../utils'
import { FeaturedProducts, Hero } from '../components';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  const response=await customFetch.get('/products?featured=true')
  // console.log(response.data.data);
  
  return {products:response.data.data};
}
export default function Landing() {
  return (
    <div>
      <Hero />
      <FeaturedProducts/>
    </div>
  )
}
