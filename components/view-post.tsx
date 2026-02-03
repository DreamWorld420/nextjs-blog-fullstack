"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

export default function ViewPost({ content }: { content: string }) {
	return (
		<div className="p-5" data-color-mode="light">
			<MarkdownPreview source={content || ""} />
		</div>
	);
}
