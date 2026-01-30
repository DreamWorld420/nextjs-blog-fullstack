import { decodeJWT } from "@/lib/decode-jwt";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const headerList = await headers();
	const authHeader = headerList.get("Authorization");

	if (!authHeader) {
		return NextResponse.json(
			{ message: "Authorization header missing" },
			{ status: 403 }
		);
	}

	const token = authHeader.replace("Bearer ", "");

	try {
		const decoded = await decodeJWT<{ id: string }>(token);

		const parsedId = parseInt(decoded.id);

		if (isNaN(parsedId)) {
			return NextResponse.json(
				{ message: "Invalid token payload" },
				{ status: 403 }
			);
		}

		let user;

		try {
			user = await prisma.user.findMany({
				where: {
					id: parsedId,
				},
				omit: {
					password: true,
				},
			});
		} catch (error) {
			return NextResponse.json(
				{ message: "User not found" },
				{
					status: 404,
				}
			);
		}

		return NextResponse.json(
			{ message: "User authenticated", data: user[0] },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Invalid or expired token" },
			{ status: 403 }
		);
	}
}
