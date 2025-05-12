
"use client";

import { useState, useEffect } from "react";
import { GetAllProducts } from "@/core/Action/GetProducts.action";
import { Product } from "@/core/Interfaces/Product.interface";
import { formatCurrency } from "@/helper/FormatCurrency";

import Swal from "sweetalert2";
import { DeleteById } from "@/core/Action/DeleteProduct";
import Modal from "../Modal";
import CreateProductScreen from "./CreateProducto";
import UpdateProductScreen from "./UpdateProduct";

const TablaProductos = () => {

  const [productosData, setProductosData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  const [idProducto, setIdProducto] = useState<string>("");


  useEffect(() => {
    GetData();
    setLoading(false);
    setIdProducto("");
  }, []);

  const GetData = async () => {
    const response = await GetAllProducts();
    if (response) {
      setProductosData(response);
    } else {
      console.error("Error fetching products");
    }
  }

  const handledeleteById = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    });
    if (result.isConfirmed) {
      const response = await DeleteById(id);

      if (response) {
        Swal.fire("Eliminado!", "El producto ha sido eliminado.", "success");
        GetData();
      } else {
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    }
  }

  return (
    <div className="overflow-x-auto shadow-lg bg-white">
      {loading ? (
        <p className="text-center py-4">Cargando...</p>
      ) : (
        <>
          <div className="flex justify-end items-center pb-1">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-500 text-white px-4 py-2 rounded mr-4">
              Agregar Producto
            </button>

            <button
              onClick={GetData}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Refrescar tabla
            </button>
            
          </div>
          <table className="min-w-full border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b text-left">Nombre</th>
                <th className="px-4 py-2 border-b text-left">Precio</th>
                <th className="px-4 py-2 border-b text-left">Cantidad</th>
                <th className="px-4 py-2 border-b text-left"></th>
              </tr>
            </thead>
            <tbody>
              {productosData.map((producto) => (
                <tr className="text-gray-600" key={producto.id}>
                  <td className="px-4 py-2 border-b">{producto.nombre}</td>
                  <td className="px-4 py-2 border-b">
                    {formatCurrency(producto.precio)}
                  </td>
                  <td className="px-4 py-2 border-b">{producto.cantidad}</td>
                  <td className=" flex items-center justify-end px-4 py-2 border-b">
                    <button

                    onClick={() =>{ 
                      setIsOpenModalUpdate(true)
                      setIdProducto(producto.id);
                    }}
                    
                    className="bg-blue-500 text-white px-4 py-2 rounded">
                      Editar
                    </button>
                    <button
                      onClick={() => handledeleteById(producto.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <Modal isOpen={isOpen} onCloseModal={() => setIsOpen(false)}>
        <CreateProductScreen/>
      </Modal>

      <Modal isOpen={isOpenModalUpdate} onCloseModal={() => setIsOpenModalUpdate(false)}>
        <UpdateProductScreen idProducto={idProducto}/>
      </Modal>
    </div>
  );
};

export default TablaProductos;
