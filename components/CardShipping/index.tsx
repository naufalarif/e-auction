import Link from "next/link";

const CardShipping = () => {
  return (
    <tr className="bg-white border-b bg-gray-100 border-gray-200">
      <td className="py-4 px-6">
        1
      </td>
      <th className="py-4 px-6">
        1212
      </th>
      <th className="py-4 px-6">
        12-02-2022
      </th>
      <td className="py-4 px-6">
        Sedang dikirim
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
          Download Resi
        </a>
      </td>
    </tr>
  )
}

export default CardShipping;