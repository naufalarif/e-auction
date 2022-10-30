/* This example requires Tailwind CSS v2.0+ */
import { FormEvent, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import Navbar from '../../../../components/Navbar';
import { deleteProductAPI, getDetailProductAPI, updateProductAPI, uploadImageAPI } from '../api';
import Img from '../../../../components/Img';
import { getProductAPI } from '../../../../services/api';
import { Product } from '../../../../types';

interface StaticProps {
  params: {
    id: string;
  }
}

interface OwnProps {
  product: {
    result: Product;
  };
}

export async function getStaticPaths() {
  const res = await getProductAPI();
  const paths = res.result.map((product: Product) => ({
    params: { id: product.id }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: StaticProps) {
  const product = await getDetailProductAPI(params.id);
  return { props: { product } };
}

export default function EditProduct({ 
  product: { 
    result: { 
      id, 
      name: productName,
      description: productDesc,
      price: productPrice,
      stock: productStock,
      image: productImg,
    } 
  } 
}: OwnProps) {
  const [name, setName] = useState<string>(productName);
  const [description, setDescription] = useState<string>(productDesc);
  const [price, setPrice] = useState<number>(productPrice);
  const [stock, setStock] = useState<number>(productStock);
  const [image, setImage] = useState<any>(productImg);

  const { mutate: deleteProduct } = useMutation(deleteProductAPI, {
    onSuccess: res => {
      if (res.status === 200) {
        window.location.reload();
      }
    }
  });
  const { mutate: updateProduct } = useMutation(updateProductAPI, {
    onSuccess: res => {
      if (res.status === 200) {
        window.location.reload();
      }
    }
  });
  const { mutate: uploadImage } = useMutation(uploadImageAPI, {
    onSuccess: res => {
      if (res.status === 200) {
        const { name, description, price, stock } = handleData();
        updateProduct({ id, name, description, price, stock, image: res.data.url });
      }
    }
  });
  const { isLoading, data } = useQuery([id], () => getDetailProductAPI(id));

  const handleChange = async (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
    if (e) e.preventDefault();

    const { name, value, files }: any = e.currentTarget;
    if (name === 'name') setName(value);
    if (name === 'price') setPrice(Number(value));
    if (name === 'description') setDescription(value);
    if (name === 'stock') setStock(Number(value));
    if (name === 'image') setImage(files[0]);
  }

  const handleUpdate = (e: any) => {
    if (e) e.preventDefault();
    if (image !== productImg) {
      uploadImage(image);
    } else {
      const { name, description, price, stock, image } = handleData();
      updateProduct({ id, name, description, price, stock, image });
    }
  };

  const handleData = (): Product => {
    let data: any = { name, description, price, stock, image };
    if (name !== productName) data.name = name;
    if (description !== productDesc) data.description = description;
    if (price !== productPrice) data.price = price;
    if (stock !== productStock) data.stock = stock;
    console.log({ data });
    return data;
  }

  const handleDelete = (e: any) => {
    if (e) e.preventDefault();
    deleteProduct(result.id);
  }

  if (isLoading) return <span>Loading...</span>;
  if (data.status === 404) return <span>Something went wrong...</span>;

  const { result } = data;

  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Product</h1>
          </div>
        </header>
        <main className='bg-gray-100'>
          <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Product</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST" onSubmit={handleUpdate}>
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          onChange={handleChange}
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={name}
                        />
                      </div>

                      <div>
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="description"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="product description"
                            onChange={handleChange}
                            value={description}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your product. URLs are hyperlinked.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">Rp</span>
                          </div>
                          <input
                            type="tel"
                            name="price"
                            id="price"
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0.00"
                            value={price}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                          Stock
                        </label>
                        <input
                          type="tel"
                          name="stock"
                          id="stock"
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={stock}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        {!result.image ? (
                          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input 
                                    id="file-upload" 
                                    name="image" 
                                    type="file"
                                    className="sr-only" 
                                    onChange={handleChange}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        ): (
                          <>
                            <Img src={result.image} width={300} height={300} />
                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input 
                                    id="file-upload" 
                                    name="image" 
                                    type="file"
                                    className="sr-only" 
                                    onChange={handleChange}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-2"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-2"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
