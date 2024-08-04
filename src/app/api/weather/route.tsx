import { NextRequest, NextResponse } from "next/server";
import { fetchWeather } from "../../utils/weather";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const lat = url.searchParams.get("lat");
	const lon = url.searchParams.get("lon");

	if (!lat || !lon) {
		return NextResponse.json(
			{ error: "Latitude and longitude are required" },
			{ status: 400 }
		);
	}

	try {
		const weatherData = await fetchWeather(Number(lat), Number(lon));
		return NextResponse.json(weatherData, { status: 200 });
	} catch (error) {
		console.error("Error fetching weather data: ", error);
		return NextResponse.json(
			{ error: "Unable to fetch weather data" },
			{ status: 500 }
		);
	}
}
