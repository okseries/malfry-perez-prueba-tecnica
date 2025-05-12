import axios from "axios";
import { Product } from "../Interfaces/Product.interface";

export const GetAllProducts = async () => {

    try {
        const {data} = await axios.get<Product[]>("http://localhost:3000/productos");
        return data;
    } catch (error) {
        
        console.error("Error fetching products:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}



export const GetProductById = async (id: string) => {
    try {
        const {data} = await axios.get<Product>(`http://localhost:3000/productos/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
