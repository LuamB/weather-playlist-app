// src/app/utils/spotify.tsx
import axios from "axios";

export async function fetchSpotifyPlaylists(
	searchTerm: string
): Promise<any[]> {
	const SPOTIFY_API_URL = "https://api.spotify.com/v1/search";
	const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN; // Ensure you set the access token somewhere securely

	if (!ACCESS_TOKEN) {
		throw new Error("Spotify access token is not defined");
	}

	try {
		const response = await axios.get(SPOTIFY_API_URL, {
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
			params: {
				q: searchTerm,
				type: "playlist",
				limit: 5,
			},
		});

		return response.data.playlists.items;
	} catch (error) {
		console.error("Error fetching Spotify playlists: ", error);
		throw new Error("Unable to fetch Spotify playlists");
	}
}
