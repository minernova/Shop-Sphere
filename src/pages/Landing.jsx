import React, { Profiler } from 'react'
import { customFetch } from '../utils'
import { FeaturedProducts, Hero } from '../components';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch('/products?featured=true'),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;
  return { products };
};

export default function Landing() {
  return (
    <div>
      <Hero />
      <FeaturedProducts/>
    </div>
  )
}
