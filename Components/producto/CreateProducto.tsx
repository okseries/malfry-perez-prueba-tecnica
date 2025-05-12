"use client"
import React, { useEffect, useState } from 'react'
import { CreateProduct } from '@/core/Action/CreateProduct';
import Swal from 'sweetalert2';
import { GetProductById } from '@/core/Action/GetProducts.action';
import { UpdateProduct } from '@/core/Action/UpdateProduct';

const CreateProductScreen = () => {
    const [id, setId] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [precio, setPrecio] = useState<number | null>(null);
    const [cantidad, setCantidad] = useState<number | null>(null);




    


    const ResetForm = () => {
        setId("");
        setNombre("");
        setPrecio(null);
        setCantidad(null);
    }

    const validation = ( ) => {
        if (!id || !nombre || !precio || !cantidad) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor completa todos los campos',
            })
            return false;
        }

        return true;
    }

    const handleCreateProduct = async () => {
        const isValid = validation();
        if (!isValid) return;

        const response = await CreateProduct({
            id,
            nombre,
            precio: precio!,
            cantidad: cantidad!
        });

        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Producto creado',
                text: `El producto ${nombre} ha sido creado`,
            });

            ResetForm();
        }
    }
   


    return (
        <div>

            <div>
                <h1 className='text-2xl font-bold mb-4'>Crear Prodcto</h1>
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
                onClick={handleCreateProduct}
                
                className='bg-blue-500 text-white px-4 py-2 rounded'>Guardar</button>
            </div>

        </div>
    )
}

export default CreateProductScreen
