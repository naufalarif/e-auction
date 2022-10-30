import axios from "axios"

export const getProductAPI = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/product');
    console.log({ res });
    return res.data;
  } catch (error: any) {
    return error.response;
  }
}