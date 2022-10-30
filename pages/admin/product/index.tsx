import Link from 'next/link';
import CardProduct from '../../../components/CardProduct';
import Navbar from '../../../components/Navbar';
import { UseGetProduct } from './query';

export default function Products() {
  const { data, isLoading, isSuccess } = UseGetProduct();
  if (isLoading && !isSuccess) return <span>Loading...</span>;
  if (data.status === 404) return <span>Something went wrong...</span>;

  const { result } = data;
  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
            <Link href="/admin/product/add">
              <button className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add New
              </button>
            </Link>
          </div>
        </header>
        <main className='bg-white'>
          <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {result.map((product: any) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
