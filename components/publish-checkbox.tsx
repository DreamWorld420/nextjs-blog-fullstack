"use client";

import { useOptimistic, useTransition } from "react";

import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";

import { togglePublishPost } from "@/app/actions";

export default function PublishCheckbox({
	checked,
	postId,
}: {
	checked: boolean;
	postId: string;
}) {
	const [isPending, startTransition] = useTransition();

	// Optimistic state
	const [optimisticPublished, setOptimisticPublished] = useOptimistic(checked);

	const handleChange = (nextChecked: boolean) => {
		// 1️⃣ Instantly update UI

		const formData = new FormData();
		formData.append("id", postId);
		formData.append("published", nextChecked.toString());

		startTransition(async () => {
			setOptimisticPublished(nextChecked);

			try {
				const promise = togglePublishPost(formData);

				toast.promise(promise, {
					loading: "Updating publish status...",
					success: "Publish status updated!",
					error: "Failed to update publish status.",
				});

				await promise;
			} catch (err) {
				// 2️⃣ Rollback if server fails
				setOptimisticPublished(!nextChecked);
			}
		});
	};

	return (
		<Checkbox checked={optimisticPublished} onCheckedChange={handleChange} />
	);
}
