import { NextRequest, NextResponse } from "next/server";

import { RegisterUserBody, RegisterUserSchema } from "./schema";
import bcrypt from "bcrypt";

import { formatYupError } from "@/lib/format-yup-error";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
	const body = await request.json();

	try {
		await RegisterUserSchema.validate(body, { abortEarly: false });
	} catch (error) {
		return NextResponse.json(
			{
				errors: formatYupError(error),
			},
			{ status: 400 },
		);
	}

	const { email, name, password } = body as RegisterUserBody;

	const hashedPassword = await bcrypt.hash(password, 12);

	let user = null;

	try {
		user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
			omit: {
				password: true,
			},
		});
	} catch {
		return NextResponse.json(
			{
				message: "Error creating user",
			},
			{ status: 400 },
		);
	}

	return NextResponse.json({
		message: "User registered successfully",
		data: user,
	});
}
