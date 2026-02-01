"use client";

import { Controller, useForm } from "react-hook-form";

import Link from "next/link";

import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { InferType } from "yup";

import { RegisterUserSchema } from "@/app/api/user/register/schema";
import { APP_ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const form = useForm({
		resolver: yupResolver(RegisterUserSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: InferType<typeof RegisterUserSchema>) => {
		const promise = fetch("/api/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		toast.promise(promise, {
			loading: "Creating your account...",
			success: "Account created successfully!",
			error: "Failed to create account. Please try again.",
		});

		await promise;
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create your account</CardTitle>
					<CardDescription>
						Enter your email below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="name">Name (Optional)</FieldLabel>
										<Input
											{...field}
											aria-invalid={fieldState.invalid}
											id="name"
											type="text"
											placeholder="John Doe"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

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
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
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
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
										<FieldDescription>
											Must be at least 8 characters long.
										</FieldDescription>
									</Field>
								)}
							/>

							<Field>
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting && <Spinner />}
									{form.formState.isSubmitting
										? "Creating Account..."
										: "Create Account"}
								</Button>
								<FieldDescription className="text-center">
									Already have an account?{" "}
									<Link href={APP_ROUTES.login}>Sign in</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
