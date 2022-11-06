import axios from "axios"

export const logoutAdminAPI = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/admin-logout');
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}