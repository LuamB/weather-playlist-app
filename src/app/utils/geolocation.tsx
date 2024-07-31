export async function fetchWeatherForGeolocation() {
	if (!navigator.geolocation) {
		throw new Error("Geolocation is not supported by this browser.");
	}

	return new Promise<any>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;

				try {
					const response = await fetch(
						`/api/weather?lat=${latitude}&lon=${longitude}`
					);
					if (!response.ok) {
						throw new Error("Failed to fetch weather data.");
					}
					const weatherData = await response.json();
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
