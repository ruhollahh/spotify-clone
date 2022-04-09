import { fetcher } from './fetcher';

export const auth = (
	mode: 'signup' | 'signin',
	credentials: { email: string; password: string }
) => {
	return fetcher(`/${mode}`, credentials);
};
