import { client } from './client';

export const auth = (
	mode: 'signup' | 'signin',
	credentials: { email: string; password: string }
) => {
	return client(`/${mode}`, credentials);
};
