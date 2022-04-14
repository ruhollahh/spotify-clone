import React from 'react';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Image, Skeleton } from '@chakra-ui/react';

const GradientLayout: React.FC<{
	image: string;
	color: string;
	title: string;
	subtitle: string;
	description: string;
	isImageRound: boolean;
}> = ({
	image,
	color,
	title,
	subtitle,
	description,
	isImageRound = false,
	children,
}) => {
	return (
		<VStack
			h="full"
			alignItems="stretch"
			bgGradient={`linear(to-b, ${color}.500 0%, ${color}.600 15%, ${color}.700 45%, rgba(0, 0, 0, 0.95) 75%)`}
			spacing="0"
		>
			<Flex gap={5} p={10} paddingTop={12}>
				<Image
					boxSize="160px"
					boxShadow="2xl"
					src={image}
					borderRadius={isImageRound ? 'full' : '3px'}
				/>
				<VStack alignSelf="flex-end" alignItems="flex-start" color="white">
					<Text textTransform="uppercase" fontSize="sm" fontWeight="bold">
						{subtitle}
					</Text>
					{title ? (
						<Heading fontSize="5xl">{title}</Heading>
					) : (
						<Skeleton h="57.6px" w="310.3px" />
					)}
					{description ? (
						<Text fontSize="sm" fontWeight="100">
							{description}
						</Text>
					) : (
						<Skeleton h="21px" w="69.26px" />
					)}
				</VStack>
			</Flex>
			<Box
				flexGrow={1}
				bgColor="blackAlpha.600"
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
		</VStack>
	);
};

export { GradientLayout };
