import type { NextApiRequest, NextApiResponse } from 'next';
import get from 'lodash/get';
import prisma from '../../../../lib/primsa';

export default async function GetProduct(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === 'GET') {
      const query: any = req.query;
      const id: string = get(query, 'id', '');
      const product = await prisma.product.findUnique({ where: { id } });
      return res.status(200).json({ message: 'success', result: product, status: 200 });
    }
    return res.status(404).json({ message: 'Route Forbidden', status: 403 });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, status: 500 });
  }
}