import { InferType, object, string } from "yup";

export const RegisterUserSchema = object({
	name: string(),
	email: string().email().required("Email is required"),
	password: string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

export type RegisterUserBody = InferType<typeof RegisterUserSchema>;
