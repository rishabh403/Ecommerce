import axios from "axios"

const fetchCategoryWiseProduct = async(category)=>{
    const body = {
        category : category
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/products/getcategoryproducts`,body);
    const data = response?.data
    return data
}

export default fetchCategoryWiseProduct