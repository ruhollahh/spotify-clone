import {
	Box,
	Container,
	Button,
	Center,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import Router from 'next/router';
import { auth } from '../../lib/mutations';

const AuthForm: React.FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await auth(mode, { email, password });
		setIsLoading(false);
		Router.push('/');
	};

	return (
		<Box w="full" h="full" bgColor="gray.900">
			<Container
				maxW="lg"
				py={{ base: '12', md: '24' }}
				px={{ base: '0', sm: '8' }}
			>
				<Stack
					as="form"
					onSubmit={handleSubmit}
					spacing="8"
					bgColor="white"
					py={{ base: '0', sm: '8' }}
					px={{ base: '4', sm: '10' }}
					borderRadius={{ base: 'none', sm: 'xl' }}
				>
					<Center>
						<Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
							Log in or Register
						</Heading>
					</Center>

					<Stack spacing="5">
						<FormControl>
							<FormLabel htmlFor="email">Email</FormLabel>
							<Input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
					</Stack>
					<Button
						type="submit"
						alignSelf="center"
						colorScheme="blue"
						isLoading={isLoading}
					>
						{mode === 'signin' ? 'Sign in' : 'Sign up'}
					</Button>
				</Stack>
			</Container>
		</Box>
	);
};

export { AuthForm };
