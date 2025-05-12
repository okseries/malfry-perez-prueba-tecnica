"use client"

import { GetAllProducts } from '@/core/Action/GetProducts.action';
import { Product } from '@/core/Interfaces/Product.interface'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    GetAllProduct();
  }, [])

  const GetAllProduct = async () => {

    const response = await GetAllProducts();

    if (response) {
      setProducts(response);
    } else {
      console.error("Error fetching products");
    }

  }
  
  return (
    <div>
      <h1>{products.length}</h1>
    </div>
  )
}

export default Home
