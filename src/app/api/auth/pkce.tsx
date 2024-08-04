import { NextRequest, NextResponse } from "next/server";
import { fetchToken } from "../../utils/auth-pkce";

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const codeVerifier = url.searchParams.get("code_verifier");

	if (!code || !codeVerifier) {
		return NextResponse.json(
			{ error: "Authorization code and code verifier are required" },
			{ status: 400 }
		);
	}

	try {
		const tokenData = await fetchToken(code, codeVerifier);
		return NextResponse.json(tokenData, { status: 200 });
	} catch (error) {
		if (error instanceof Error)
			return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
