"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { DataTable } from "./ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";

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
			cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
		}),
		columnsHelper.display({
			id: "actions",
			cell: ({ row }) => {
				return (
					<div className="space-x-2">
						<Link href={APP_ROUTES.singlePost(row.original.id)}>
							<Button variant={"outline"}>View</Button>
						</Link>
						<Link href={APP_ROUTES.singlePostEdit(row.original.id)}>
							<Button variant={"outline"}>Edit</Button>
						</Link>

						<Button
							variant={"destructive"}
							onClick={() => {
								alert(`Delete post with ID: ${row.original.id}`);
							}}
						>
							Delete
						</Button>
					</div>
				);
			},
		}),
	];

	return <DataTable data={props.data} columns={columns} />;
}
