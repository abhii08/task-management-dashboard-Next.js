import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export async function getUserIdFromToken(req: NextApiRequest): Promise<string | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token?.sub || null;
}

export function isAuthenticated(userId: string | null): boolean {
  return userId !== null;
}