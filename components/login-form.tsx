"use client";

import { Controller, useForm } from "react-hook-form";

import Link from "next/link";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { InferType } from "yup";

import { LoginUserSchema } from "@/app/api/user/login/schema";
import { APP_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const form = useForm({
		resolver: yupResolver(LoginUserSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: InferType<typeof LoginUserSchema>) => {
		const promise = fetch("/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					localStorage.setItem("token", data.token);
				});
			} else {
				throw new Error("Login failed");
			}
		});

		toast.promise(promise, {
			loading: "Logging in...",
			success: "Logged in successfully!",
			error: "Failed to log in. Please try again.",
		});

		await promise;
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											id="email"
											placeholder="m@example.com"
										/>
									</Field>
								)}
							/>

							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											id="password"
											type="password"
										/>
									</Field>
								)}
							/>

							<Field>
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting && <Spinner />}
									{form.formState.isSubmitting ? "Logging in..." : "Log In"}
								</Button>
								<FieldDescription className="text-center">
									Don&apos;t have an account?{" "}
									<Link href={APP_ROUTES.signup}>Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
