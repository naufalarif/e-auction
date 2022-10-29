declare module 'imgbb-uploader';

export interface Product {
  id: string,
  name: string,
  description: string,
  image: string,
  date_created: string,
  price: number,
  stock: number,
  sold: number
}