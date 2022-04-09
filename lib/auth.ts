import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export const validateRoute = (handler) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const token = req.cookies.access_token;
		if (token) {
			let user;
			try {
				const { id } = jwt.verify(token, 'hello');
				user = await prisma.user.findUnique({
					where: {
						id,
					},
				});
				if (!user) {
					throw new Error('no user');
				}
			} catch (e) {
				return res.status(401).json({ error: 'Not Allowed' });
			}
			return handler(req, res, user);
		}
		return res.status(401).json({ error: 'Not Allowed' });
	};
};
