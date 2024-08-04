// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import WeatherFetcher from "./components/WeatherFetcher";
import {
	fetchWeatherForGeolocation,
	fetchWeatherForCity,
} from "./utils/weather";

export default function Home() {
	const [city, setCity] = useState("geolocation");
	const [weatherData, setWeatherData] = useState(null);
	const [showInput, setShowInput] = useState(false);

	useEffect(() => {
		async function getWeather() {
			if (city === "geolocation") {
				try {
					const data = await fetchWeatherForGeolocation();
					setWeatherData(data);
				} catch (error) {
					console.warn(
						"Geolocation fetch failed, falling back to default city."
					);
					const defaultCityWeather = await fetchWeatherForCity("Berlin");
					setWeatherData(defaultCityWeather);
				}
			} else {
				const data = await fetchWeatherForCity(city);
				setWeatherData(data);
			}
		}

		getWeather();
	}, [city]);

	const handleCityChange = () => {
		setShowInput(true);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const cityInput = event.target.elements.city.value;
		if (cityInput) {
			setCity(cityInput);
			setShowInput(false);
		}
	};

	return (
		<div>
			<WeatherFetcher weatherData={weatherData} />
			<div
				className="absolute top-2 right-2 cursor-pointer"
				onClick={handleCityChange}
				title="Change city"
			>
				<svg
					className="w-6 h-6 text-gray-700 hover:text-gray-900"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9 5l7 7-7 7"
					></path>
				</svg>
			</div>
			{showInput && (
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="Your city"
						className="p-2 border rounded"
					/>
					<button
						type="submit"
						className="ml-2 p-2 bg-blue-500 text-white rounded"
					>
						Get Weather
					</button>
				</form>
			)}
		</div>
	);
}

// "use client";

// import React, { useState } from "react";
// import WeatherFetcher from "./components/WeatherFetcher";

// export default function Home() {
// 	const [city, setCity] = useState("berlin");
// 	const [selectedCity, setSelectedCity] = useState("berlin");

// 	function handleSubmit(event: React.FormEvent) {
// 		event.preventDefault();
// 		setSelectedCity(city);
// 	}

// 	return (
// 		<div>
// 			<WeatherFetcher city={selectedCity} />
// 			<form onSubmit={handleSubmit} className="mt-4 text-center">
// 				<input
// 					type="text"
// 					id="city"
// 					value={city}
// 					onChange={(e) => setCity(e.target.value)}
// 					placeholder="Your city"
// 					className="p-2 border rounded"
// 				/>
// 				<button
// 					type="submit"
// 					className="ml-2 p-2 bg-blue-500 text-white rounded"
// 				>
// 					Get Weather
// 				</button>
// 			</form>
// 		</div>
// 	);
// }
