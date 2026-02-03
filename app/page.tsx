import { cookies } from "next/headers";
import Link from "next/link";

import BlogPostItem from "@/components/blog-post-item";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/routes";
import prisma from "@/lib/prisma";

export default async function Home() {
	const posts = await prisma.post.findMany({
		where: {
			published: true,
		},
		include: {
			author: {
				omit: {
					password: true,
				},
			},
		},
	});

	const token = (await cookies()).get("token")?.value;

	return (
		<div className="container mx-auto flex h-svh flex-col">
			<nav className="flex items-center justify-between pt-5">
				<h1 className="text-2xl font-bold">SuperBlog</h1>
				<div className="flex gap-2">
					{token ? (
						<Link href={APP_ROUTES.dashboard}>
							<Button>Dashboard</Button>
						</Link>
					) : (
						<>
							<Link href={APP_ROUTES.login}>
								<Button variant="outline">Login</Button>
							</Link>
							<Link href={APP_ROUTES.signup}>
								<Button>Register</Button>
							</Link>
						</>
					)}
				</div>
			</nav>

			<main className="mt-20 flex flex-col">
				{posts.map((post) => (
					<BlogPostItem post={post} key={post.id} />
				))}
			</main>
		</div>
	);
}
