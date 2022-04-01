import { Box, HStack, VStack } from '@chakra-ui/layout';

const PlayerLayout = ({ children }) => {
	return (
		<VStack alignItems="stretch" minH="100%" spacing={0}>
			<HStack alignItems="stretch" flexGrow={1}>
				<Box flexBasis="250px" bgColor="red.300">
					Sidebar
				</Box>
				<Box flexGrow={1}>{children}</Box>
			</HStack>
			<Box height="75px" bgColor="green.300">
				Player
			</Box>
		</VStack>
	);
};

export default PlayerLayout;
