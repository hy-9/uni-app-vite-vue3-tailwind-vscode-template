import { icebreaker } from "@icebreakers/eslint-config";
import prettierConfig from "eslint-config-prettier";

export default icebreaker(
	{
		vue: true,
		tailwindcss: {
			tailwindConfig: "./tailwind.config.ts",
		},
		weapp: true,
	},
	{
		ignores: [".agents/**", ".claude/**", ".continue/**", "skills/**"],
		rules: {
			"better-tailwindcss/no-unknown-classes": "off",
			"better-tailwindcss/enforce-consistent-line-wrapping": "off",
			indent: ["error", 4],
			"vue/html-indent": ["error", 4],
			"jsonc/indent": "off",
			"format/prettier": "off",
		},
	},
	prettierConfig,
);
