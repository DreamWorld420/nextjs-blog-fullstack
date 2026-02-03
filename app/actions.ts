"use server";

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
