"use client"

import CardComponent from '@/Components/Card'
import Modal from '@/Components/Modal'
import TablaProductos from '@/Components/producto/ListaProductos'
import React from 'react'

const ProductoScrren = () => {
  return (
    <>
      <CardComponent
        title="Lista de Productos"
        className=' mx-auto'
      >
        <TablaProductos />
      </CardComponent>

    </>
  )
}

export default ProductoScrren
