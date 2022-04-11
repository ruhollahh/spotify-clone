import { Box, HStack, VStack } from '@chakra-ui/layout';
import { Sidebar } from '../Sidebar';

const PlayerLayout = ({ children }) => {
	return (
		<VStack alignItems="stretch" h="100%" spacing={0}>
			<HStack alignItems="stretch" h="calc(100% - 100px)" spacing="0">
				<Box minW="250px">
					<Sidebar />
				</Box>
				<Box
					flexGrow={1}
					h="100%"
					overflowY="auto"
					sx={{
						'&::-webkit-scrollbar': {
							width: '10px',
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: 'transparent',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'gray.800',
							borderRadius: '20px',
							border: '2px solid transparent',
							backgroundClip: 'content-box',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							backgroundColor: 'gray.700',
						},
					}}
				>
					{children}
				</Box>
			</HStack>
			<Box minH="100px">Player</Box>
		</VStack>
	);
};

export { PlayerLayout };
