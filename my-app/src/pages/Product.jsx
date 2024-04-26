import React from 'react'
import { getProduct } from '../api';

export function loader({ params }) {
    const id = Number(params.id);
    const article = getProduct(id);
    return article;
  }
function Product() {
  return (
    <div>Product</div>
  )
}

export default Product