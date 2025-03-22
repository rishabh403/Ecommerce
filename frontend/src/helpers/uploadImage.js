import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern-product"); // Ensure this matches your Cloudinary preset name
    try {
        const dataResponse = await axios.post(url, formData);
        return dataResponse.data; // Use `data` instead of `json()` for Axios
    } catch (error) {
        console.error("Error uploading image:", error.response?.data || error.message);
        throw error;
    }
};

export default uploadImage;