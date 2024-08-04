import { NextRequest, NextResponse } from "next/server";
import { fetchCoords } from "../../utils/weather";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const city = url.searchParams.get("city");

	if (!city) {
		return NextResponse.json(
			{ error: "City name is required" },
			{ status: 400 }
		);
	}

	try {
		const coordsData = await fetchCoords(city as string);
		return NextResponse.json(coordsData, { status: 200 });
	} catch (error) {
		console.error("Error fetching coordinates: ", error);
		return NextResponse.json(
			{ error: "Unable to fetch coordinates" },
			{ status: 500 }
		);
	}
}
