import React from 'react'
import { customFetch } from '../utils'

export const loader = async () => {
  const response=await customFetch.get('/products?featured=true')
  // console.log(response.data.data);
  
  return {products:response.data.data};
}
export default function Landing() {
  return (
    <div>Landing</div>
  )
}
