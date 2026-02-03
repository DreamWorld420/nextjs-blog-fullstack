"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Sheet } from "./ui/sheet";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Post, User } from "@/app/generated/prisma/client";

export default function BlogPostItem({
	post,
}: {
	post: Post & { author: Omit<User, "password"> };
}) {
	return (
		<div key={post.id}>
			<Card>
				<CardHeader className="border-b border-solid border-black/10">
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-1">
							<h2 className="text-xl font-semibold">{post.title}</h2>
							<h3 className="text-muted-foreground text-sm font-medium">
								By {post.author.email || "Unknown Author"}
							</h3>
						</div>
						<p className="text-muted-foreground text-sm font-light">
							{Intl.DateTimeFormat("en-US", {
								year: "numeric",
								month: "long",
								day: "2-digit",
							}).format(new Date(post.createdAt))}
						</p>
					</div>
				</CardHeader>
				<CardContent className="px-8" data-color-mode="light">
					<MarkdownPreview source={post.content || ""} style={{}} />
				</CardContent>
			</Card>
		</div>
	);
}
