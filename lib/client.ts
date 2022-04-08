export const client = (url: string, data) => {
	return fetch(`${window.location.origin}/api${url}`, {
		method: data ? 'POST' : 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: data ? JSON.stringify(data) : undefined,
	});
};
