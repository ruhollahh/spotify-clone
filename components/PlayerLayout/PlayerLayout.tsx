import { Box, HStack, VStack } from '@chakra-ui/layout';

import { PlayerBar } from '../PlayerBar';
import { Sidebar } from '../Sidebar';

const PlayerLayout = ({ children }) => {
	return (
		<VStack alignItems="stretch" h="full" spacing="0">
			<HStack alignItems="stretch" h="calc(100% - 100px)" spacing="0">
				<Box minW="250px">
					<Sidebar />
				</Box>
				<Box flexGrow={1} h="full">
					{children}
				</Box>
			</HStack>
			<Box minH="100px">
				<PlayerBar />
			</Box>
		</VStack>
	);
};

export { PlayerLayout };
