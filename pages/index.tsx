import CardProduct from "../components/CardProduct";
import Navbar from "../components/Navbar";
import { UseGetProduct } from "./query";

export default function Home() {
  const { data, isLoading, isSuccess }: any = UseGetProduct();
  if (isLoading && !isSuccess) return <span>Loading...</span>;
  if (data.status === 404) return <span>Something went wrong...</span>;

  const { result } = data;
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {result.map((product: any) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
        <style global jsx>{`
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          .custom-number-input input:focus {
            outline: none !important;
          }

          .custom-number-input button:focus {
            outline: none !important;
          }
        `}</style>
      </div>
    </>
  )
}