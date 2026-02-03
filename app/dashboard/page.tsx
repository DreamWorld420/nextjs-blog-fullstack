import { cookies } from "next/headers";
import Link from "next/link";

import PostTable from "@/components/post-table";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/routes";
import { decodeJWT } from "@/lib/decode-jwt";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
	const token = (await cookies()).get("token")?.value as string;

	const id = ((await decodeJWT(token)) as any).id;

	const posts = await prisma.post.findMany({
		where: {
			authorId: id,
		},
	});

	return (
		<div className="flex flex-col gap-4 p-5">
			<div className="flex justify-end">
				<Link href={APP_ROUTES.createPost}>
					<Button className="w-fit">Create Post</Button>
				</Link>
			</div>
			<PostTable data={posts} />
		</div>
	);
}
