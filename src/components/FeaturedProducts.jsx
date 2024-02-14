import React from 'react'
import SectionTitle from './SectionTitle'
import ProductsGrid from './ProductsGrid'

export default function FeaturedProducts() {
  return (
    <div className='pt-24'>
        <SectionTitle text='featured products'/>
        <ProductsGrid />
    </div>
  )
}
