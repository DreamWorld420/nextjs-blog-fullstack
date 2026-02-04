import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { APP_ROUTES } from "@/constants/routes";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const token = (await cookies()).get("token")?.value;

	if (!token) redirect(APP_ROUTES.login);

	await fetch(`${process.env.API_ENDPOINT}/api/user/me`, {
		method: "GET",
		headers: { authorization: `Bearer ${token}` },
	}).then((res) => {
		if (!res.ok) {
			redirect(APP_ROUTES.login);
		}
	});

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}
