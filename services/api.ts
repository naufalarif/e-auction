import axios from "axios"

export const getProduct = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products');
    return res.data;
  } catch (error: any) {
    return error.response;
  }
}