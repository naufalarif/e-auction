import Link from "next/link";

const CardPayment = () => {
  return (
    <tr className="bg-white border-b bg-gray-100 border-gray-200">
      <td className="py-4 px-6">
        1
      </td>
      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
        1212
      </th>
      <td className="py-4 px-6">
        $2999
      </td>
      <td className="py-4 px-6">
        <Link href="/admin/order">
          <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
            Open
          </span>
        </Link>
      </td>
      <td className="py-4 px-6">
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
          Download Invoice
        </a>
      </td>
    </tr>
  )
}

export default CardPayment;