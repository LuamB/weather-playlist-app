// Fetches weather data based on latitude and longitude
export async function fetchWeather(lat: number, lon: number) {
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
	if (!apiKey) {
		throw new Error("API key is not defined");
	}
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
	);
	if (!res.ok) {
		throw new Error("Failed to fetch weather");
	}
	const data = await res.json();
	return data;
}

// Fetches coordinates based on city name
export async function fetchCoords(city: string) {
	const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
	if (!apiKey) {
		throw new Error("API key is not defined");
	}
	const res = await fetch(
		`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
			city
		)}&limit=3&appid=${apiKey}`
	);
	if (!res.ok) {
		throw new Error("Failed to fetch coordinates");
	}
	const data = await res.json();
	return data;
}

// Fetches weather data for the current user location
export async function fetchWeatherForGeolocation() {
	if (!navigator.geolocation) {
		throw new Error("Geolocation is not supported by this browser.");
	}

	return new Promise<any>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;

				try {
					const weatherData = await fetchWeather(latitude, longitude);
					resolve(weatherData);
				} catch (error) {
					reject(error);
				}
			},
			(error) => {
				reject(error);
			}
		);
	});
}
