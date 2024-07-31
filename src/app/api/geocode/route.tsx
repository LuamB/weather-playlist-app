import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export async function GET(request: Request) {
	const url = new URL(request.url);
	const city = url.searchParams.get("city");

	if (!city) {
		return NextResponse.json(
			{ error: "City name is required" },
			{ status: 400 }
		);
	}

	try {
		const response = await axios.get(
			`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
				city
			)}&limit=3&appid=${API_KEY}`
		);
	} catch (error) {
		console.error("Error fetching coordinates: ", error);
		return NextResponse.json(
			{ error: "Unable to fetch coordinates" },
			{ status: 500 }
		);
	}
}
