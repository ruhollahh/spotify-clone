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
	return (
		<VStack
			alignItems="flex-start"
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
		</VStack>
	);
};

export { Sidebar };
