import axios from "axios"

export const loginAdmin = async (data: any) => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/admin-login', data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}