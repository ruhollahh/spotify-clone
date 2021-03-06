import { Box, Flex } from '@chakra-ui/layout';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useStoreActions } from 'easy-peasy';
import { GradientLayout } from '../../components/GradientLayout';
import { validateToken } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { formatDate, formatSongDuration } from '../../lib/formatter';

const generateRandomColor = (id) => {
	const colors = [
		'green',
		'red',
		'yellow',
		'blue',
		'teal',
		'purple',
		'orange',
		'cyan',
	];
	return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
	const changeActiveSongs = useStoreActions(
		(store: any) => store.changeActiveSongs
	);
	const changeActiveSong = useStoreActions(
		(store: any) => store.changeActiveSong
	);

	const handlePlay = (song?) => {
		const { songs } = playlist;
		changeActiveSong(song ?? songs[0]);
		changeActiveSongs(songs);
	};

	return (
		<GradientLayout
			color={generateRandomColor(playlist.id)}
			image={`https://picsum.photos/200/300?random=${playlist.id}`}
			title={playlist.name}
			subtitle="playlist"
			description={`${playlist.songs.length} Songs`}
			isImageRound={false}
		>
			<Flex direction="column" gap={5} color="white" pt="10">
				<Box pl={10}>
					<IconButton
						aria-label="Play"
						icon={<BsFillPlayFill size={30} />}
						isRound
						colorScheme="green"
						onClick={() => handlePlay()}
					/>
				</Box>
				<Table variant="unstyled">
					<Thead borderBottom="2px solid rgba(255, 255, 255, 0.1)">
						<Tr>
							<Th>#</Th>
							<Th>Title</Th>
							<Th>Date Added</Th>
							<Th>
								<AiOutlineClockCircle />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{playlist.songs.map((song, i) => (
							<Tr
								key={song.id}
								sx={{
									transition: 'all 0.3s',
									'&:hover': {
										bgColor: 'rgba(255, 255, 255, 0.2)',
									},
								}}
								cursor="pointer"
								onClick={() => handlePlay(song)}
							>
								<Td>{i + 1}</Td>
								<Td>{song.name}</Td>
								<Td>{formatDate(song.createdAt)}</Td>
								<Td>{formatSongDuration(song.duration)}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Flex>
		</GradientLayout>
	);
};

export const getServerSideProps = async ({ query, req }) => {
	let user;

	try {
		user = validateToken(req.cookies.access_token);
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: '/signin',
			},
		};
	}
	const playlist = await prisma.playlist.findFirst({
		where: {
			id: Number(query.id),
			userId: user.id,
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
