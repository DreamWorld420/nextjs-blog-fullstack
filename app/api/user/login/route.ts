import { NextRequest, NextResponse } from "next/server";

import { LoginUserBody, LoginUserSchema } from "./schema";
import bcrypt from "bcrypt";

import { encodeJWT } from "@/lib/encode-jwt";
import { formatYupError } from "@/lib/format-yup-error";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
	const body = await request.json();

	try {
		await LoginUserSchema.validate(body, { abortEarly: false });
	} catch (error) {
		return NextResponse.json(
			{
				errors: formatYupError(error),
			},
			{ status: 400 },
		);
	}

	const { email, password } = body as LoginUserBody;

	let user = null;

	try {
		user = await prisma.user.findMany({
			where: {
				email,
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: "user not found",
			},
			{ status: 400 },
		);
	}

	const passwordCorrect = await bcrypt.compare(password, user[0].password);

	if (!passwordCorrect) {
		return NextResponse.json(
			{
				message: "invalid password",
			},
			{ status: 400 },
		);
	}

	let token = null;

	try {
		token = await encodeJWT({ id: user[0].id });
	} catch (error) {
		return NextResponse.json(
			{
				message: "Error generating token",
			},
			{ status: 500 },
		);
	}

	return NextResponse.json({
		message: "User logged in successfully",
		token,
	});
}
