import { Box, HStack, VStack } from '@chakra-ui/layout';
import { Sidebar } from '../Sidebar';

const PlayerLayout = ({ children }) => {
	return (
		<VStack alignItems="stretch" h="100%" spacing={0}>
			<HStack alignItems="stretch" h="calc(100% - 100px)">
				<Box flexBasis="250px">
					<Sidebar />
				</Box>
				<Box flexGrow={1}>{children}</Box>
			</HStack>
			<Box minH="100px" bgColor="green.300">
				Player
			</Box>
		</VStack>
	);
};

export { PlayerLayout };
