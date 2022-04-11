import { Box, Heading, HStack, VStack, Text } from '@chakra-ui/layout';
import { Artist } from '@prisma/client';
import { Image } from '@chakra-ui/react';
import { GradientLayout } from '../components/GradientLayout';
import { prisma } from '../lib/prisma';

const Home = ({ artists }) => {
	return (
		<GradientLayout
			image="https://placekitten.com/300/300"
			title="Dan Abramov"
			subtitle="profile"
			description="11 followers"
			color="gray"
			isImageRound
		>
			<VStack p={5} py={10} color="white" alignItems="flex-start" spacing={10}>
				<Box>
					<Heading fontSize="xl">Top artists this month</Heading>
					<Text>only visible to you</Text>
				</Box>
				<HStack>
					{artists.map((artist: Artist) => (
						<VStack
							key={artist.id}
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
				</HStack>
			</VStack>
		</GradientLayout>
	);
};

export const getServerSideProps = async () => {
	const artists = await prisma.artist.findMany({});

	return {
		props: { artists },
	};
};

export default Home;
