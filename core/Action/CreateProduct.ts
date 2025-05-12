import axios from 'axios';
import { Product } from '../Interfaces/Product.interface';


export const CreateProduct = async (prosduct: Product) => {

    try {

        const {data} =await axios.post<Product>("http://localhost:3000/productos", prosduct);

        return data;
        
    } catch (error) {
        
        console.error("Error creating product:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }

}
