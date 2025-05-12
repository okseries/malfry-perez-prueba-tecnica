import axios from "axios";

export const DeleteById = async (id: string) => {

    try {
        await axios.delete<boolean>(`http://localhost:3000/productos/${id}`);
        return true;
    } catch (error) {

        console.error("Error fetching product by ID:", error);
        throw error; // Rethrow the error to handle it in the calling function
        
    }
}