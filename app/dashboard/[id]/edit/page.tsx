import { cookies } from "next/headers";

import MDEditor from "@uiw/react-md-editor";

import EditPostForm from "@/components/edit-post-form";
import { Input } from "@/components/ui/input";
import { decodeJWT } from "@/lib/decode-jwt";
import prisma from "@/lib/prisma";

export default async function SinglePostEditPage({
	params,
}: {
	params: { id: string };
}) {
	const token = (await cookies()).get("token")?.value as string;

	const id = ((await decodeJWT(token)) as any).id;

	const post = await prisma.post.findUnique({
		where: {
			id: Number((await params).id),
			authorId: Number(id),
		},
	});

	return <EditPostForm post={post} authorId={id} isEdit />;
}
