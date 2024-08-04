// src/app/error.tsx
"use client";

import React from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className="bg-red-200 p-4 rounded-lg shadow-md">
			<h1 className="text-lg">An error occurred</h1>
			<p>{error.message}</p>
			<button
				onClick={reset}
				className="mt-4 bg-blue-500 text-white p-2 rounded"
			>
				Try Again
			</button>
		</div>
	);
}

// import React from "react";

// export default function Error({
// 	error,
// 	reset,
// }: {
// 	error: Error;
// 	reset: () => void;
// }) {
// 	return (
// 		<div className="bg-red-200 p-4 rounded-lg shadow-md">
// 			<h1 className="text-lg">An error occurred</h1>
// 			<p>{error.message}</p>
// 			<button
// 				onClick={reset}
// 				className="mt-4 bg-blue-500 text-white p-2 rounded"
// 			>
// 				Try Again
// 			</button>
// 		</div>
// 	);
// }
