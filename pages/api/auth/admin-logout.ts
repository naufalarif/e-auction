import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie';

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
      const serialised = serialize("AdminSession", '', {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });
      res.setHeader('Set-Cookie', serialised);
      return res.status(200).json({ message: 'logout_admin_success', status: 200 });
    } else {
      return res.status(403).json({ message: 'forbidden_route', status: 403 });
    }
  } catch (error) {
    return res.status(500).json({ message: 'server_error', result: error, status: 500 });
  }
}
