import React from 'react';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

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
			minH="full"
			alignItems="stretch"
			bgGradient={`linear(to-b, ${color}.500 0%, ${color}.600 15%, ${color}.700 45%, rgba(0, 0, 0, 0.95) 75%)`}
			spacing={0}
		>
			<Flex gap={5} p={5} paddingTop={12}>
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
					<Heading fontSize="5xl">{title}</Heading>
					<Text fontSize="sm" fontWeight="100">
						{description}
					</Text>
				</VStack>
			</Flex>
			<Box flexGrow={1} bgColor="blackAlpha.600">
				{children}
			</Box>
		</VStack>
	);
};

export { GradientLayout };
