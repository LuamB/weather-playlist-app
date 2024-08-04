// src/app/components/WeatherFetcher.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
	fetchWeatherForGeolocation,
	fetchWeatherForCity,
} from "../utils/weather";
import WeatherWidget from "./WeatherWidget";

interface WeatherFetcherProps {
	defaultCity?: string;
}

export default function WeatherFetcher({
	defaultCity = "Berlin",
}: WeatherFetcherProps) {
	const [weatherData, setWeatherData] = useState<any | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [city, setCity] = useState<string>("geolocation");
	const [showInput, setShowInput] = useState<boolean>(false);

	useEffect(() => {
		async function fetchWeather() {
			try {
				let data;
				if (city === "geolocation") {
					try {
						data = await fetchWeatherForGeolocation();
					} catch (geoError) {
						console.error("Geolocation error:", geoError);
						data = await fetchWeatherForCity(defaultCity);
					}
				} else {
					data = await fetchWeatherForCity(city);
				}
				setWeatherData(data);
			} catch (err) {
				setError("Failed to fetch weather data");
			}
		}
		fetchWeather();
	}, [city, defaultCity]);

	function handleCityChange(newCity: string) {
		setCity(newCity);
		setShowInput(false);
	}

	function onCityChange() {
		setShowInput(!showInput);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="weather-fetcher">
			{weatherData ? (
				<WeatherWidget
					city={city}
					weatherData={weatherData}
					onCityChange={onCityChange}
				/>
			) : (
				<div>Loading...</div>
			)}
			{showInput && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const input = (e.target as HTMLFormElement).elements.namedItem(
							"city"
						) as HTMLInputElement;
						handleCityChange(input.value);
					}}
					className="city-form"
				>
					<input
						type="text"
						name="city"
						placeholder="Enter city name"
						className="p-2 border border-gray-300 rounded"
					/>
					<button
						type="submit"
						className="ml-2 p-2 bg-blue-500 text-white rounded"
					>
						Change City
					</button>
				</form>
			)}
		</div>
	);
}

// import React, { useEffect, useState } from "react";
// import WeatherWidget from "./WeatherWidget";
// import { fetchCoords, fetchWeather } from "../utils/weather";
// import { getCachedData, setCachedData } from "../utils/cache";

// interface WeatherFetcherProps {
// 	city: string;
// }

// export default function WeatherFetcher({ city }: WeatherFetcherProps) {
// 	const [weatherData, setWeatherData] = useState<any>(null);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		async function fetchWeatherData() {
// 			// Reset states at the beginning of the fetch operation
// 			setWeatherData(null);
// 			setError(null);
// 			try {
// 				const cachedData = getCachedData(city);
// 				if (cachedData) {
// 					setWeatherData(cachedData);
// 					return;
// 				}

// 				const coordsData = await fetchCoords(city || "berlin");
// 				if (!coordsData || coordsData.length === 0) {
// 					throw new Error("No coordinates found");
// 				}
// 				const { lat, lon } = coordsData[0];
// 				const weatherData = await fetchWeather(lat, lon);
// 				setWeatherData(weatherData);
// 				setCachedData(city, weatherData);
// 			} catch (error) {
// 				if (error instanceof Error) {
// 					setError(error.message);
// 				} else {
// 					setError("An unknown error occurred");
// 				}
// 			}
// 		}

// 		fetchWeatherData();
// 	}, [city]);

// 	if (error) {
// 		return (
// 			<div className="bg-red-200 p-4 rounded-lg shadow-md">
// 				<p className="text-lg">{error}</p>
// 			</div>
// 		);
// 	}

// 	if (!weatherData) {
// 		return <p>Loading...</p>;
// 	}

// 	return <WeatherWidget city={city} weatherData={weatherData} />;
// }

// app/components/WeatherFetcher.tsx

// 'use client';

// import React, { useEffect, useState } from "react";
// import WeatherWidget from "./WeatherWidget";
// import { fetchWeatherForGeolocation } from "../utils/fetchers";

// interface WeatherFetcherProps {
//   city?: string;
// }

// export default function WeatherFetcher({ city }: WeatherFetcherProps) {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const data = city ? await fetchCoords(city) : await fetchWeatherForGeolocation();
//         if (!data || (Array.isArray(data) && data.length === 0)) {
//           throw new Error('No data found');
//         }
//         const weather = city ? await fetchWeather(data[0].lat, data[0].lon) : data;
//         setWeatherData(weather);
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError('An unknown error occurred');
//         }
//       }
//     };

//     fetchWeatherData();
//   }, [city]);

//   if (error) {
//     return (
//       <div className="bg-red-200 p-4 rounded-lg shadow-md">
//         <p className="text-lg">{error}</p>
//       </div>
//     );
//   }

//   if (!weatherData) {
//     return <p>Loading...</p>;
//   }

//   return <WeatherWidget city={city || 'Current Location'} weatherData={weatherData} />;
// }
