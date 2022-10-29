import { useQuery } from "@tanstack/react-query";
import CardProduct from "../components/CardProduct";
import Img from "../components/Img"
import Navbar from "../components/Navbar";
import { getProduct } from "../services/api";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

export default function Home() {
  const { data, isLoading, isSuccess } = useQuery(['products'], getProduct);
  if (isLoading && !isSuccess) return <span>Loading...</span>;
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


      // <footer className={styles.footer}>
      //   <a
      //     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     Powered by{' '}
      //     <span className={styles.logo}>
      //       <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      //     </span>
      //   </a>
      // </footer>