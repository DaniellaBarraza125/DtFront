import axios from "axios";
const API_URL = 'https://e-learning-experience.onrender.com/products';

const getAllProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(API_URL, {
        headers: {
            Authorization: token,
        },
    }
    )
    return res.data;
}

const productService = {
    getAllProducts,
}

export default productService;