"use client";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import MDEditor from "@uiw/react-md-editor";

import { createPost, editPost } from "@/app/actions";
import { Post } from "@/app/generated/prisma/client";
import { APP_ROUTES } from "@/constants/routes";

export interface EditPostFormProps {
	authorId: number;
	post?: Post | null;
	isEdit?: boolean;
}

export default function EditPostForm({
	post,
	isEdit,
	authorId,
}: EditPostFormProps) {
	const router = useRouter();
	const [title, setTitle] = useState<string>(post?.title || "");
	const [value, setValue] = useState<string | undefined>(post?.content || "");
	const [transition, startTransition] = useTransition();

	return (
		<div className="flex h-full flex-col gap-4 p-5">
			<div>
				<Input
					placeholder="Title"
					defaultValue={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mb-2 w-full"
				/>
			</div>
			<div className="grow" data-color-mode="light">
				<MDEditor value={value} height={"100%"} onChange={setValue} />
			</div>
			<div className="flex justify-end">
				<Button
					className="w-fit self-end"
					disabled={transition}
					onClick={() => {
						const formData = new FormData();
						formData.append("title", title);
						formData.append("content", value || "");

						if (isEdit && post) {
							formData.append("id", post.id.toString());
						}

						formData.append("authorId", authorId.toString());

						startTransition(() => {
							if (isEdit) {
								editPost(formData).then(() =>
									router.push(APP_ROUTES.dashboard),
								);
							} else {
								createPost(formData).then(() =>
									router.push(APP_ROUTES.dashboard),
								);
							}
						});
					}}
				>
					{transition ? <Spinner /> : null}
					{transition ? "Saving..." : "Save Post"}
				</Button>
			</div>
		</div>
	);
}
