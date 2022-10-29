// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import md5 from 'md5';
import prisma from '../../lib/primsa';
import jwt from 'jsonwebtoken';

type Data = {
  message: string;
  result?: any;
  status: number;
}

export default async function AdminLogin(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const { name, password } = req.body;
      const passwordHashed = md5(password);
      const user = await prisma.admin.findMany({
        where: { name, password: passwordHashed },
      });
      if (user.length === 0) return res.status(404).json({ message: 'login_admin_failed', result: 'Who are you?', status: 404 });
      const token = jwt.sign({ name }, 'secretss', { expiresIn: '1 day' });
      return res.status(200).json({ message: 'login_admin_success', result: token, status: 200 });
    } else {
      return res.status(403).json({ message: 'forbidden_route', status: 403 });
    }
  } catch (error) {
    console.log('db error: ', error);
    return res.status(500).json({ message: 'server_error', result: error, status: 500 });
  }
}
