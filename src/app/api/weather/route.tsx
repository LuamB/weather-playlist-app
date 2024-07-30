import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export async function GET(request: Request) {
	const url = new URL(request.url);
	const lat = url.searchParams.get("lat");
	const lon = url.searchParams.get("lon");

	if (!lat || lon) {
		return NextResponse.json(
			{ error: "Latitude and longitude are required" },
			{ status: 400 }
		);
	}

	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
		);
	} catch (error) {
		console.error("Error fetching weather data: ", error);
		return NextResponse.json(
			{ error: "Uable to fetch weather data" },
			{ status: 500 }
		);
	}
}
