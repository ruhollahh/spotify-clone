import { Box, HStack, Text } from '@chakra-ui/layout';
import { useStoreState } from 'easy-peasy';
import { Player } from '../Player/Player';

const PlayerBar = () => {
	const activeSongs = useStoreState((store: any) => store.activeSongs);
	const activeSong = useStoreState((store: any) => store.activeSong);

	return (
		<HStack
			h="full"
			px="10"
			bgColor="gray.900"
			color="white"
			spacing="10"
			justify="space-between"
		>
			{activeSong ? (
				<>
					<Box>
						<Text fontSize="large">{activeSong.name}</Text>
						<Text fontSize="small">{activeSong.artist.name}</Text>
					</Box>
					<Box flexBasis="40%">
						<Player activeSongs={activeSongs} activeSong={activeSong} />
					</Box>
					<Box />
				</>
			) : null}
		</HStack>
	);
};

export { PlayerBar };
