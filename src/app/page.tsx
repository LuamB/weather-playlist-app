"use client";

import React, { useState } from "react";
import WeatherFetcher from "./components/WeatherFetcher";

export default function Home() {
	const [city, setCity] = useState("berlin");
	const [selectedCity, setSelectedCity] = useState("berlin");

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setSelectedCity(city);
	}

	return (
		<div>
			<WeatherFetcher city={selectedCity} />
			<form onSubmit={handleSubmit} className="mt-4 text-center">
				<label htmlFor="city" className="block text-lg mb-2">
					Your city
				</label>
				<input
					type="text"
					id="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					placeholder="Berlin"
					className="p-2 border rounded"
				/>
				<button
					type="submit"
					className="ml-2 p-2 bg-blue-500 text-white rounded"
				>
					Get Weather
				</button>
			</form>
		</div>
	);
}
