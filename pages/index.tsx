import { Box, Heading, VStack, Text, Flex } from '@chakra-ui/layout';
import { Artist } from '@prisma/client';
import { Image } from '@chakra-ui/react';
import { GradientLayout } from '../components/GradientLayout';
import { prisma } from '../lib/prisma';
import { useMe } from '../lib/hooks';
import { validateToken } from '../lib/auth';

const Home = ({ artists }) => {
	const { user } = useMe();

	return (
		<GradientLayout
			image="https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/032/medium/oapgW_Fp_400x400.jpg"
			title={user && `${user.firstName} ${user.lastName}`}
			subtitle="profile"
			description={user && `${user.playlistCount} playlists`}
			color="gray"
			isImageRound
		>
			<VStack p={5} py={10} color="white" alignItems="flex-start" spacing={10}>
				<Box>
					<Heading fontSize="xl">Top artists this month</Heading>
					<Text>only visible to you</Text>
				</Box>
				<Flex gap={5} wrap="wrap">
					{artists.map((artist: Artist) => (
						<VStack
							key={artist.id}
							flexBasis="200px"
							spacing={7}
							p={5}
							bgColor="gray.900"
							alignItems="flex-start"
						>
							<Image
								src="https://placekitten.com/300/300"
								boxSize="160px"
								borderRadius="full"
							/>
							<VStack spacing={0} alignItems="flex-start">
								<Text fontSize="large">{artist.name}</Text>
								<Text fontSize="x-small">Artist</Text>
							</VStack>
						</VStack>
					))}
				</Flex>
			</VStack>
		</GradientLayout>
	);
};

export const getServerSideProps = async ({ req }) => {
	try {
		validateToken(req.cookies.access_token);
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: '/signin',
			},
		};
	}

	const artists = await prisma.artist.findMany({});

	return {
		props: { artists },
	};
};

export default Home;
