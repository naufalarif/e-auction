import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductAPI } from "../../../services/api";
import { addProductAPI, getDetailProductAPI, uploadImageAPI } from "./api";

interface Data {
  name: string;
  description: string;
  price: number; 
  stock: number;
  image?: string | any;
}

export const UseGetProduct = () => useQuery(['product'], getProductAPI);
export const UseGetDetailProduct = (id: string) => useQuery([id], () => getDetailProductAPI(id));
export const UseAddProduct = (data: Data) => {
  return useMutation(() => addProductAPI(data), {
    onSuccess: (res: any) => {
      if (res.status === 200) {
        window.location.reload();
      }
    }
  });
}
export const UseUploadImage = (data: Data) => {
  return useMutation((image) => uploadImageAPI(image), {
    onSuccess: (res: any) => {
      const { name, description, price, stock } = data;
      UseAddProduct({ name, description, price, stock, image: res.data.url });
    }
  });
}