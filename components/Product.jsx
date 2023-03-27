import { urlFor } from '@/lib/client'
import Link from 'next/link'
import React from 'react'

const Product = ({product}) => {
  return (
    <div>
      <Link href={`/product/${product.slug?.current}`}>
        <div className='product-card'>
          <img width={250} height={250} src={urlFor(product.image && product.image[0])} className="product-image" alt="" />
          <p className='product-name'>{product.name}</p>
          <p className='product-price'>${product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product