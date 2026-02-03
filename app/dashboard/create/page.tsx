import { cookies } from "next/headers";

import EditPostForm from "@/components/edit-post-form";
import { decodeJWT } from "@/lib/decode-jwt";

export default async function CreatePostPage() {
	const token = (await cookies()).get("token")?.value as string;

	const id = ((await decodeJWT(token)) as any).id;

	return <EditPostForm authorId={id} />;
}
