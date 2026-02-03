export default {
	"./**/*.{ts,tsx,js,jsx}": ["pnpm format", "pnpm lint:fix"],
	"./*.{json,md,css}": "pnpm format",
};
