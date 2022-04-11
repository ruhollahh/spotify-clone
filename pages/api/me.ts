import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../lib/auth';
import { prisma } from '../../lib/prisma';

export default validateRoute(
	async (req: NextApiRequest, res: NextApiResponse, user: User) => {
		const playlistCount = await prisma.playlist.count({
			where: {
				userId: user.id,
			},
		});
		return res.status(200).json({ user: { ...user, playlistCount } });
	}
);
