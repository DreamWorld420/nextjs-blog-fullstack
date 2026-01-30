import { object, string, InferType } from "yup";

export const LoginUserSchema = object({
	email: string().email().required("Email is required"),
	password: string().required("Password is required"),
});

export type LoginUserBody = InferType<typeof LoginUserSchema>;
