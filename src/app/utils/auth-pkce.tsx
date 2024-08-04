// src/app/utils/pkce.ts
import axios from "axios";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_TOKEN_ENDPOINT;

export async function fetchToken(code: string, codeVerifier: string) {
	if (!TOKEN_ENDPOINT) {
		throw new Error("Token endpoint is not configured");
	}

	try {
		const response = await axios.post(TOKEN_ENDPOINT, {
			client_id: CLIENT_ID,
			redirect_uri: REDIRECT_URI,
			grant_type: "authorization_code",
			code,
			code_verifier: codeVerifier,
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching token: ", error);
		throw new Error("Unable to fetch token");
	}
}
