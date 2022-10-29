import axios from "axios";

export const addProductAPI = async (data: any) => {
  try {
    const res = await axios.post('http://localhost:3000/api/admin/add-product', data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const uploadImageAPI = async (file: any) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    const res = await axios({ 
      method: 'POST',
      url: 'https://api.imgbb.com/1/upload?key=2fb8200d8f88f1fd2612c01972bf1a9b',
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const getDetailProductAPI = async (id: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/product/${id}`);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const deleteProductAPI = async (id: string) => {
  try {
    const res = await axios.delete(`http://localhost:3000/api/admin/delete-product`, { data: id });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const updateProductAPI = async (data: any) => {
  try {
    const res = await axios.put('http://localhost:3000/api/admin/update-product', { data });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}