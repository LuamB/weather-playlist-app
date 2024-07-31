import React from "react";
import Image from "next/image";

interface WeatherData {
	weather: {
		id: number;
		icon: string;
		description: string;
	}[];
	main: {
		temp: number;
	};
	sys: {
		country: string;
	};
}

interface WeatherWidgetProps {
	city: string;
	weatherData: WeatherData;
}

export default function WeatherWidget({
	city,
	weatherData,
}: WeatherWidgetProps) {
	const iconUrl = `/img/weather-icons/${weatherData?.weather[0].icon}@2x.png`;
	const country = weatherData.sys.country;

	return (
		<div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
			<h3 className="text-2xl mb-2">{`${
				city.charAt(0).toUpperCase() + city.slice(1)
			}, ${country}`}</h3>
			<div className="flex items-center justify-center mb-2">
				<Image
					src={iconUrl}
					alt={weatherData?.weather[0].description || "Weather icon"}
					width={64}
					height={64}
					className="w-16 h-16"
				/>
				<h1 className="text-4xl ml-2">{`${weatherData?.main.temp}°C`}</h1>
			</div>
			<p className="text-lg">{weatherData?.weather[0].description}</p>
		</div>
	);
}
