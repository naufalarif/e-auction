import Link from "next/link";

const CardReport = () => {
  return (
    <tr className="bg-white border-b bg-gray-100 border-gray-200">
      <td className="py-4 px-6">
        1
      </td>
      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
        1212
      </th>
      <td className="py-4 px-6">
        Selesai
      </td>
      <td className="py-4 px-6">
        12-12-2021
      </td>
      <td className="py-4 px-6">
        <Link href="/admin/order">
          <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
            Open
          </span>
        </Link>
      </td>
    </tr>
  )
}

export default CardReport;