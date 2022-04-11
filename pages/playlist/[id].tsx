import { validateToken } from '../../lib/auth';
import { prisma } from '../../lib/prisma';

const Playlist = ({ playlist }) => {
	return <div>{playlist.name}</div>;
};

export const getServerSideProps = async ({ query, req }) => {
	const { id } = validateToken(req.cookies.access_token);
	const playlist = await prisma.playlist.findFirst({
		where: {
			id: Number(query.id),
			userId: id,
		},
		include: {
			songs: {
				include: {
					artist: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	});

	return {
		props: {
			playlist,
		},
	};
};

export default Playlist;
