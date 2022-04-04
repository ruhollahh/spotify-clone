import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { email, password } = req.body;
			let user;
			try {
				user = await prisma.user.findUnique({
					where: { email },
				});
			} catch (e) {
				return res.status(400).json({ error: e.message });
			}
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign(
					{
						id: user.id,
						email: user.email,
					},
					'hello',
					{ expiresIn: '8h' }
				);
				res.setHeader(
					'Set-Cookie',
					cookie.serialize('access_token', token, {
						httpOnly: true,
						maxAge: 8 * 60 * 60,
						path: '/',
						sameSite: 'lax',
						secure: process.env.NODE_ENV === 'production',
					})
				);
				return res.status(200).json({ user });
			} else {
				return res.status(401).json({ error: 'Wrong credentials' });
			}
		default:
			return res.status(404).json({ error: 'Not Found' });
	}
}
