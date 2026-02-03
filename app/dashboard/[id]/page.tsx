import { cookies } from "next/headers";

import ViewPost from "@/components/view-post";
import { decodeJWT } from "@/lib/decode-jwt";
import prisma from "@/lib/prisma";

export default async function ViewPostPage({
	params,
}: {
	params: { id: string };
}) {
	const token = (await cookies()).get("token")?.value;

	const authorId = (await decodeJWT(token || ""))?.id;

	const post = await prisma.post.findUnique({
		where: {
			id: parseInt((await params).id),
			authorId: authorId!,
		},
	});

	return <ViewPost content={post?.content || ""} />;
}
