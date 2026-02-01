import { InferType, object, string } from "yup";

export const LoginUserSchema = object({
	email: string().email().required("Email is required"),
	password: string().required("Password is required"),
});

export type LoginUserBody = InferType<typeof LoginUserSchema>;
