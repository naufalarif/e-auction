/* This example requires Tailwind CSS v2.0+ */
import CardReport from '../../../components/CardReport';
import CardShipping from '../../../components/CardShipping';
import Navbar from '../../../components/Navbar';
import Pagination from '../../../components/Pagination';

const Report = () => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <Navbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Report</h1>
          </div>
        </header>
        <main className='bg-gray-100'>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-900 sm:overflow-hidden sm:rounded-md shadow">
                <thead className="text-xs uppercase bg-white text-gray-900">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Order ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Konfirmasi
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <CardReport />
                  <CardReport />
                  <CardReport />
                  <CardReport />
                  <CardReport />
                  <CardReport />
                  <CardReport />
                  <CardReport />
                  <CardReport />
                  <CardReport />
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        </main>
      </div>
    </>
  )
}

export default Report;