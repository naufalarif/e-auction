import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/primsa';

export default async function AddProduct(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === 'DELETE') {
      const id = req.body;
      const deleteProduct = await prisma.product.delete({ where: { id } });
      return res.status(200).json({ message: 'success', result: deleteProduct, status: 200 });
    }
    return res.status(404).json({ message: 'Route Forbidden', status: 403 });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, status: 500 });
  }
}