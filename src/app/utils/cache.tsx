const cache: { [key: string]: any } = {};

export function getCachedData(key: string) {
	return cache[key];
}

export function setCachedData(key: string, data: any) {
	cache[key] = data;
}
