import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import PostTable from "@/components/post-table";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/routes";
import { decodeJWT } from "@/lib/decode-jwt";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
	let token;
	try {
		token = (await cookies()).get("token")?.value as string;
	} catch {
		redirect(APP_ROUTES.login);
	}

	let id;
	try {
		id = ((await decodeJWT(token)) as any).id;
	} catch {
		redirect(APP_ROUTES.login);
	}

	let posts;
	try {
		posts = await prisma.post.findMany({
			where: {
				authorId: id,
			},
		});
	} catch {
		redirect(APP_ROUTES.login);
	}

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
