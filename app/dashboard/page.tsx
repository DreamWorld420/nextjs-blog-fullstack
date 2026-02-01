import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/constants/routes";

export default async function DashboardPage() {
	const token = (await cookies()).get("token")?.value;

	if (!token) redirect(APP_ROUTES.login);

	await fetch("http://localhost:3000/api/user/me", {
		method: "GET",
		headers: { authorization: `Bearer ${token}` },
	}).then((res) => {
		if (!res.ok) {
			redirect(APP_ROUTES.login);
		}
	});

	return <div>Dashboard Page</div>;
}
