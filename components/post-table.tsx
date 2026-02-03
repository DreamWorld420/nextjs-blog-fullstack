"use client";

import Link from "next/link";

import PublishCheckbox from "./publish-checkbox";
import { Button } from "./ui/button";
import { DataTable } from "./ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import { toast } from "sonner";

import { deletePost } from "@/app/actions";
import { Post } from "@/app/generated/prisma/client";
import { APP_ROUTES } from "@/constants/routes";

export interface PostTableProps {
	data: Post[];
}

const columnsHelper = createColumnHelper<Post>();

export default function PostTable(props: PostTableProps) {
	const columns = [
		columnsHelper.accessor("title", {
			header: "Title",
		}),
		columnsHelper.accessor("published", {
			header: "Published",
			cell: ({ getValue, row }) => (
				<PublishCheckbox
					checked={getValue()}
					postId={row.original.id.toString()}
				/>
			),
		}),
		columnsHelper.display({
			id: "actions",
			cell: ({ row }) => {
				return (
					<div className="space-x-2">
						<Link href={APP_ROUTES.singlePost(row.original.id)}>
							<Button variant="outline">
								<Eye />
								View
							</Button>
						</Link>
						<Link href={APP_ROUTES.singlePostEdit(row.original.id)}>
							<Button variant="outline">
								<Edit />
								Edit
							</Button>
						</Link>

						<Button
							variant="destructive"
							onClick={async () => {
								const formData = new FormData();
								formData.append("id", row.original.id.toString());

								const promise = deletePost(formData);

								toast.promise(promise, {
									loading: "Deleting post...",
									success: "Post deleted successfully!",
									error: "Failed to delete post.",
								});

								await promise;
							}}
						>
							<Trash />
							Delete
						</Button>
					</div>
				);
			},
		}),
	];

	return <DataTable data={props.data} columns={columns} />;
}
