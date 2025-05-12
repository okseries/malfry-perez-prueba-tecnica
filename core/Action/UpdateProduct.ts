import axios from 'axios';
import { Product } from '../Interfaces/Product.interface';





export const UpdateProduct  = async (id: string, data: Partial<Product>) =>
{

    const {cantidad, nombre, precio} = data;

    try {

        const response  = await axios.get(`http://localhost:3000/productos/${id}`)

        console.log("response", response.data);

        if (!response.data)
        {
            return {message: "No se encontró el producto"};
        }

        console.log("Paso del la peticion get");
        await axios.patch(`http://localhost:3000/productos/${id}`, {
            nombre,
            precio,
            cantidad
        });

        console.log("Paso del la peticion patch");

        return {message: "Producto actualizado"};
        
    } catch (error) {
        console.error("Error updating product:", error);
        return {message: "Error al actualizar el producto"};
    }

}