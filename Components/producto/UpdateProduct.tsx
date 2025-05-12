"use client"
import React, { useEffect, useState } from 'react'
import { CreateProduct } from '@/core/Action/CreateProduct';
import Swal from 'sweetalert2';
import { Product } from '@/core/Interfaces/Product.interface';
import { GetProductById } from '@/core/Action/GetProducts.action';
import { UpdateProduct } from '@/core/Action/UpdateProduct';

interface Props {
    idProducto?: string
}

const UpdateProductScreen = ({ idProducto }: Props) => {
    const [id, setId] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [precio, setPrecio] = useState<number | null>(null);
    const [cantidad, setCantidad] = useState<number | null>(null);




    useEffect(() => {
        getProductoById();
    }, [idProducto])

    const getProductoById = async () => {
        if (!idProducto) return;

        const response = await GetProductById(idProducto);
        if (response) {
            setId(response.id);
            setNombre(response.nombre);
            setPrecio(response.precio);
            setCantidad(response.cantidad);
        }
    }



    const ResetForm = () => {
        setId("");
        setNombre("");
        setPrecio(null);
        setCantidad(null);
    }

   
    const handleUpdateProduct = async () => {
        if ( !nombre || !precio || !cantidad) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor completa todos los campos',
            })
            return;
        }

        if(!idProducto)
        {
            return;
        }
        

        const rsponse = await UpdateProduct(idProducto, {
            nombre,
            precio: precio,
            cantidad: cantidad
        });


        if (rsponse) {
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Producto actualizado correctamente',
            })
            // ResetForm();
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el producto',
            })
        }

    }

    return (
        <div>

            <div>
                <h1 className='text-2xl font-bold mb-4'>{idProducto ? "Actualizar Producto" : "Crear Prodcto"}</h1>
                <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor="file">Id</label>
                    <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className=' bg-gray-100 px-4 py-2 focus:outline-none focus:ring-0  rounded-xl' placeholder='Id' type='text' />
                </div>

                <div className='flex flex-col gap-1  mb-4'>
                    <label htmlFor="file">Nombre</label>

                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className=' bg-gray-100 px-4 py-2 focus:outline-none focus:ring-0  rounded-xl' placeholder='Nombre' type='text' />
                </div>
                <div className='flex flex-col gap-1  mb-4'>
                    <label htmlFor="file">Precio</label>

                    <input
                        value={precio ?? ""}
                        onChange={(e) => setPrecio(Number(e.target.value))}
                        className=' bg-gray-100 px-4 py-2 focus:outline-none focus:ring-0  rounded-xl' placeholder='Precio' type='number' />
                </div>
                <div className='flex flex-col gap-1  mb-4'>
                    <label htmlFor="file">Cantidad</label>

                    <input

                        value={cantidad ?? ""}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        className=' bg-gray-100 px-4 py-2 focus:outline-none focus:ring-0  rounded-xl' placeholder='Cantidad' type='number' />
                </div>
            </div>

            <div className='flex justify-end gap-2'>
                <button
                    onClick={handleUpdateProduct}

                    className='bg-blue-500 text-white px-4 py-2 rounded'>Actualizar
                </button>
            </div>

        </div>
    )
}

export default UpdateProductScreen
