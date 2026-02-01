import preferAlias from "@dword-design/eslint-plugin-import-alias";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores(["node_modules/*", ".next/*"]),
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		ignores: ["node_modules/*", ".next/*"],
	},
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			"@dword-design/import-alias": preferAlias,
		},
		rules: {
			"@dword-design/import-alias/prefer-alias": [
				"error",
				{
					alias: {
						"@/public": "./public",
						"@": "./",
					},
				},
			],
		},
	},
	{
		plugins: {
			"unused-imports": unusedImports,
		},
	},
	{
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			// Consistently import navigation APIs from `@/navigation` for multi lingual only
			// "no-restricted-imports": [
			// 	"error",
			// 	{
			// 		name: "next/link",
			// 		message: "Please import from `@/i18n` instead.",
			// 	},
			// 	{
			// 		name: "next/navigation",
			// 		importNames: [
			// 			"redirect",
			// 			"permanentRedirect",
			// 			"useRouter",
			// 			"usePathname",
			// 		],
			// 		message: "Please import from `@/i18n` instead.",
			// 	},
			// ],
			"react/jsx-curly-brace-presence": ["error", "never"],
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"react/prop-types": "off",
			"no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-unused-expression": "off",
			"unused-imports/no-unused-imports": "error",
			"@typescript-eslint/no-require-imports": "off",
			"react/no-children-prop": "off",
			"no-console": ["warn", { allow: ["warn"] }],
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},
]);
