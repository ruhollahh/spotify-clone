import useSWR from 'swr';
import { fetcher } from './fetcher';

export const useMe = () => {
	const { data, error } = useSWR('/me', fetcher);

	return {
		user: data?.user,
		isLoading: !data && !error,
		error,
	};
};

export const usePlaylist = () => {
	const { data, error } = useSWR('/playlist', fetcher);
	return {
		playlist: data?.playlist || [],
		isLoading: !data && !error,
		error,
	};
};
