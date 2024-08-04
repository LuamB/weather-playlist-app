export async function fetchData(url: string): Promise<any> {
	const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
	if (!API_KEY) {
		throw new Error("API key is not defined");
	}

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
