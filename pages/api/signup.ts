/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	switch (method) {
		case 'POST':
			const { email, password } = req.body;
			const salt = bcrypt.genSaltSync();
			const hashedPassword = bcrypt.hashSync(password, salt);
			let user;
			try {
				user = await prisma.user.create({
					data: {
						email,
						password: hashedPassword,
					},
				});
			} catch (e) {
				return res.status(400).json({ error: 'User already exist' });
			}
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
			return res.status(201).json({ user });
		default:
			return res.status(404).json({ error: 'Not Found' });
	}
}
