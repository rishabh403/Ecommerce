import { toast } from 'react-toastify'
import axios from 'axios'


const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/addtocart`,{productId:id},{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const responseData =response.data
    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }
    return responseData
}


export default addToCart