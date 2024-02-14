import React from 'react'
import { Filters, PaginationConatiner, ProductsContainer } from '../components'
import { customFetch } from '../utils'

export const loader = async ({ request }) => {
  const params=Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  const response = await customFetch('/products', { params });

  const products = response.data.data;
  const meta = response.data.meta;

  return { products, meta, params };
};

export default function Products() {
  return (
    <>
      <Filters/>
      <ProductsContainer/>
      <PaginationConatiner/>
    </>
  )
}
