import { Box, HStack, Text } from '@chakra-ui/layout';
import { Player } from '../Player/Player';

const PlayerBar = () => {
	return (
		<HStack
			h="full"
			px="10"
			bgColor="gray.900"
			color="white"
			spacing="10"
			justify="space-between"
		>
			<Box>
				<Text fontSize="large">Song Name</Text>
				<Text fontSize="small">Artist Name</Text>
			</Box>
			<Box flexBasis="40%">
				<Player />
			</Box>
			<Box />
		</HStack>
	);
};

export { PlayerBar };
