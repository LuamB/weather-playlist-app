"use client";

import React, { useEffect, useState } from "react";
import { fetchSpotifyPlaylists } from "../utils/spotify";

interface SpotifyWidgetProps {
	weatherCondition: string;
	weatherIcon: string;
}

export default function SpotifyWidget({
	weatherCondition,
	weatherIcon,
}: SpotifyWidgetProps) {
	const [playlists, setPlaylists] = useState<any[]>([]);
	const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number>(0);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPlaylists() {
			try {
				let searchTerm = weatherCondition.toLowerCase();
				if (weatherCondition === "Atmosphere") {
					searchTerm = "fog mist haze";
				} else if (weatherCondition === "Clear") {
					searchTerm = weatherIcon === "01d" ? "sun" : "night";
				}
				// else if (["Rain", "Snow"].includes(weatherCondition)) {
				// 	searchTerm = `${weatherCondition.toLowerCase()}*`;
				// }

				const data = await fetchSpotifyPlaylists(searchTerm);
				setPlaylists(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unknown error occurred");
				}
			}
		}

		fetchPlaylists();
	}, [weatherCondition, weatherIcon]);

	function handleNextPlaylist() {
		setCurrentPlaylistIndex((prevIndex) => (prevIndex + 1) % playlists.length);
	}

	if (error) {
		return (
			<div className="bg-red-200 p-4 rounded-lg shadow-md">
				<p className="text-lg">{error}</p>
			</div>
		);
	}

	if (playlists.length === 0) {
		return <p>Loading...</p>;
	}

	return (
		<div className="spotify-widget">
			<h2 className="text-xl font-bold mb-4">Spotify Playlist</h2>
			<div>
				<iframe
					src={`https://open.spotify.com/embed/playlist/${playlists[currentPlaylistIndex].id}`}
					width="300"
					height="380"
					allow="encrypted-media"
					className="mb-2"
				></iframe>
				<button
					onClick={handleNextPlaylist}
					className="ml-2 p-2 bg-blue-500 text-white rounded"
				>
					Next Playlist
				</button>
			</div>
		</div>
	);
}
