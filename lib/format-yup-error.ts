import { ValidationError } from "yup";

export function formatYupError(error: unknown) {
	if (!(error instanceof ValidationError)) {
		return { general: ["An unknown error occurred"] };
	}

	const errors: Record<string, string[]> = {};

	error.inner.forEach((err) => {
		if (!err.path) return;

		if (!errors[err.path]) {
			errors[err.path] = [];
		}

		errors[err.path].push(err.message);
	});

	return errors;
}
