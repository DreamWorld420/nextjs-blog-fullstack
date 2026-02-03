import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const response = new NextResponse(
		JSON.stringify({ message: "Logged out successfully" }),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	response.cookies.set("token", "", {
		httpOnly: true, // JS cannot access (prevents XSS)
		secure: process.env.NODE_ENV === "production", // HTTPS only in prod
		sameSite: "lax", // CSRF protection
		path: "/", // available on all routes
		maxAge: 0, // immediately expire the cookie
	});

	return response;
}
