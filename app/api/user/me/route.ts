import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { decodeJWT } from "@/lib/decode-jwt";
import prisma from "@/lib/prisma";

export async function GET() {
	const headerList = await headers();
	const cookieStore = await cookies();

	// 1️⃣ Try Authorization header first
	const authHeader = headerList.get("authorization");
	let token: string | undefined;

	if (authHeader?.startsWith("Bearer ")) {
		token = authHeader.replace("Bearer ", "");
	}

	// 2️⃣ If no header token, try cookie
	if (!token) {
		token = cookieStore.get("token")?.value;
	}

	// 3️⃣ Still no token → unauthorized
	if (!token) {
		return NextResponse.json(
			{ message: "Authentication required" },
			{ status: 401 },
		);
	}

	try {
		const decoded = await decodeJWT<{ id: string }>(token);
		const parsedId = Number(decoded.id);

		if (isNaN(parsedId)) {
			return NextResponse.json(
				{ message: "Invalid token payload" },
				{ status: 403 },
			);
		}

		const user = await prisma.user.findUnique({
			where: { id: parsedId },
			omit: {
				password: true,
			},
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "User authenticated", data: user },
			{ status: 200 },
		);
	} catch {
		return NextResponse.json(
			{ message: "Invalid or expired token" },
			{ status: 403 },
		);
	}
}
