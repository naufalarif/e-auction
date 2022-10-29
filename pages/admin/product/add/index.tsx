/* This example requires Tailwind CSS v2.0+ */
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import Navbar from '../../../../components/Navbar';
import { addProduct, uploadImage } from '../api';

export default function AddProduct() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);
  const [image, setImage] = useState<any>('');
  
  const { mutate: uploadProduct } = useMutation(addProduct);
  const { mutate } = useMutation(uploadImage, {
    onSuccess: res => {
      if (res.status === 200) {
        uploadProduct({ name, description, price, stock, image: res.data.url });
        window.location.reload();
      }
    }
  });

  const handleChange = async (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
    if (e) e.preventDefault();

    const { name, value, files }: any = e.currentTarget;
    if (name === 'name') setName(value);
    if (name === 'price') setPrice(Number(value));
    if (name === 'description') setDescription(value);
    if (name === 'stock') setStock(Number(value));
    if (name === 'image') setImage(files[0]);
  }

  const handleSubmit = (e: any) => {
    if (e) e.preventDefault();
    mutate(image);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Product</h1>
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
                <form action="#" method="POST" onSubmit={handleSubmit}>
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
                            defaultValue={''}
                            onChange={handleChange}
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
                            type="number"
                            name="price"
                            id="price"
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                          Stock
                        </label>
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          onChange={handleChange}
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        {!image ? (
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
                          <input type='text' value={image.name} />
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                      >
                        Submit
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
