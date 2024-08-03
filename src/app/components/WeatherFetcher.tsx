"use client";

import React, { useEffect, useState } from "react";
import WeatherWidget from "./WeatherWidget";
import { fetchCoords, fetchWeather } from "../utils/fetcher";
import { getCachedData, setCachedData } from "../utils/cache";

interface WeatherFetcherProps {
	city: string;
}

export default function WeatherFetcher({ city }: WeatherFetcherProps) {
	const [weatherData, setWeatherData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchWeatherData() {
			// Reset states at the beginning of the fetch operation
			setWeatherData(null);
			setError(null);
			try {
				const cachedData = getCachedData(city);
				if (cachedData) {
					setWeatherData(cachedData);
					return;
				}

				const coordsData = await fetchCoords(city || "berlin");
				if (!coordsData || coordsData.length === 0) {
					throw new Error("No coordinates found");
				}
				const { lat, lon } = coordsData[0];
				const weatherData = await fetchWeather(lat, lon);
				setWeatherData(weatherData);
				setCachedData(city, weatherData);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unknown error occurred");
				}
			}
		}

		fetchWeatherData();
	}, [city]);

	if (error) {
		return (
			<div className="bg-red-200 p-4 rounded-lg shadow-md">
				<p className="text-lg">{error}</p>
			</div>
		);
	}

	if (!weatherData) {
		return <p>Loading...</p>;
	}

	return <WeatherWidget city={city} weatherData={weatherData} />;
}

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
