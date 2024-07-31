// app/components/WeatherFetcher.tsx
import React from "react";
import WeatherWidget from "./WeatherWidget";

interface WeatherFetcherProps {
	city?: string;
}

async function fetchWeather(city: string) {
	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_BASE_URL
		}/api/direct-geocode?city=${encodeURIComponent(city)}`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch coordinates");
	}
	const coordsData = await response.json();
	if (coordsData.length === 0) {
		throw new Error("No coordinates found");
	}

	const { lat, lon } = coordsData[0];
	const weatherResponse = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/weather?lat=${lat}&lon=${lon}`
	);
	if (!weatherResponse.ok) {
		throw new Error("Failed to fetch weather data");
	}
	return await weatherResponse.json();
}

export default async function WeatherFetcher({
	city = "berlin",
}: WeatherFetcherProps) {
	try {
		const weatherData = await fetchWeather(city);
		return <WeatherWidget city={city} weatherData={weatherData} />;
	} catch (error) {
		return (
			<div className="bg-red-200 p-4 rounded-lg shadow-md">
				<p className="text-lg">{(error as Error).message}</p>
			</div>
		);
	}
}
