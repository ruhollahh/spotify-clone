import {
	Box,
	Divider,
	LinkBox,
	LinkOverlay,
	List,
	ListIcon,
	ListItem,
	VStack,
} from '@chakra-ui/layout';
import {
	MdFavorite,
	MdHome,
	MdLibraryMusic,
	MdPlaylistAdd,
	MdSearch,
} from 'react-icons/md';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { usePlaylist } from '../../lib/hooks';

const navMenu = [
	{
		name: 'Home',
		icon: MdHome,
		route: '/',
	},
	{
		name: 'Search',
		icon: MdSearch,
		route: '/search',
	},
	{
		name: 'Your Library',
		icon: MdLibraryMusic,
		route: '/library',
	},
];

const musicMenu = [
	{
		name: 'Create Playlist',
		icon: MdPlaylistAdd,
		route: '/',
	},
	{
		name: 'Favorites',
		icon: MdFavorite,
		route: '/favorites',
	},
];

const Sidebar = () => {
	const { playlist } = usePlaylist();
	return (
		<VStack
			alignItems="stretch"
			spacing={6}
			h="100%"
			bg="black"
			p={4}
			color="gray"
		>
			<Box>
				<NextImage src="/logo.svg" width={120} height={60} />
			</Box>
			<List spacing={2}>
				{navMenu.map((item) => (
					<ListItem key={item.name}>
						<LinkBox>
							<ListIcon as={item.icon} mr={4} />
							<NextLink href={item.route} passHref>
								<LinkOverlay>{item.name}</LinkOverlay>
							</NextLink>
						</LinkBox>
					</ListItem>
				))}
			</List>
			<List spacing={2}>
				{musicMenu.map((item) => (
					<ListItem key={item.name}>
						<LinkBox>
							<ListIcon as={item.icon} mr={4} />
							<NextLink href={item.route} passHref>
								<LinkOverlay>{item.name}</LinkOverlay>
							</NextLink>
						</LinkBox>
					</ListItem>
				))}
			</List>
			<Divider color="gray.800" />
			<List
				spacing={2}
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
				{playlist.map((item) => (
					<ListItem key={item.id}>
						<LinkBox>
							<NextLink href="/" passHref>
								<LinkOverlay>{item.name}</LinkOverlay>
							</NextLink>
						</LinkBox>
					</ListItem>
				))}
			</List>
		</VStack>
	);
};

export { Sidebar };
