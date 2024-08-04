// src/app/components/WeatherWidget.tsx

import React from "react";
import Image from "next/image";

interface WeatherData {
	weather: {
		id: number;
		main: string; // this will be used as searchTerm for the playlists
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
	onCityChange: () => void;
}

export default function WeatherWidget({
	city,
	weatherData,
	onCityChange,
}: WeatherWidgetProps) {
	const iconUrl = `/img/weather-icons/${weatherData?.weather[0].icon}@2x.png`;
	const country = weatherData.sys.country;

	return (
		<div className="bg-blue-200 p-4 rounded-lg shadow-md text-center relative">
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
			<div
				className="absolute top-2 right-2 cursor-pointer"
				onClick={onCityChange}
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
		</div>
	);
}

// import React from "react";
// import Image from "next/image";

// interface WeatherData {
// 	weather: {
// 		id: number;
// 		icon: string;
// 		description: string;
// 	}[];
// 	main: {
// 		temp: number;
// 	};
// 	sys: {
// 		country: string;
// 	};
// }

// interface WeatherWidgetProps {
// 	city: string;
// 	weatherData: WeatherData;
// }

// export default function WeatherWidget({
// 	city,
// 	weatherData,
// }: WeatherWidgetProps) {
// 	const iconUrl = `/img/weather-icons/${weatherData?.weather[0].icon}@2x.png`;
// 	const country = weatherData.sys.country;

// 	return (
// 		<div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
// 			<h3 className="text-2xl mb-2">{`${
// 				city.charAt(0).toUpperCase() + city.slice(1)
// 			}, ${country}`}</h3>
// 			<div className="flex items-center justify-center mb-2">
// 				<Image
// 					src={iconUrl}
// 					alt={weatherData?.weather[0].description || "Weather icon"}
// 					width={64}
// 					height={64}
// 					className="w-16 h-16"
// 				/>
// 				<h1 className="text-4xl ml-2">{`${weatherData?.main.temp}°C`}</h1>
// 			</div>
// 			<p className="text-lg">{weatherData?.weather[0].description}</p>
// 		</div>
// 	);
// }
