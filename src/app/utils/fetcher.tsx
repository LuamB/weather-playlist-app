import { fetchData } from "../api/utils/helper";

// Fetches weather data based on latitude and longitude
interface WeatherData {
	weather: {
		id: number;
		description: string;
		icon: string;
	}[];
	main: {
		temp: number;
	};
	sys: {
		country: string;
	};
}

interface CoordsData {
	lat: number;
	lon: number;
}

export async function fetchWeather(
	lat: number,
	lon: number
): Promise<WeatherData> {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
	return fetchData(url);
}

// Fetches coordinates based on city name
export async function fetchCoords(city: string): Promise<CoordsData> {
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
		city
	)}&limit=3&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`;
	return fetchData(url);
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
