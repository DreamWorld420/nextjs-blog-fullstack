"use server";

import { revalidatePath } from "next/cache";

import { APP_ROUTES } from "@/constants/routes";
import prisma from "@/lib/prisma";

export async function editPost(data: FormData) {
	const title = data.get("title") as string;
	const content = data.get("content") as string;
	const authorId = data.get("authorId") as string;
	const id = data.get("id") as string;

	await prisma.post.update({
		where: { id: Number(id) },
		data: {
			title,
			content,
			authorId: Number(authorId),
		},
	});
}

export async function createPost(data: FormData) {
	const title = data.get("title") as string;
	const content = data.get("content") as string;
	const authorId = data.get("authorId") as string;

	await prisma.post.create({
		data: {
			title,
			content,
			authorId: Number(authorId),
		},
	});
}

export async function deletePost(data: FormData) {
	const id = data.get("id") as string;

	await prisma.post
		.delete({
			where: { id: Number(id) },
		})
		.then(() => {
			revalidatePath(APP_ROUTES.dashboard);
		});
}
