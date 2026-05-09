import { icebreaker } from "@icebreakers/stylelint-config";

export default icebreaker({
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [
					"use",
					"forward",
					"apply",
					"layer",
					"import",
					"include",
					"mixin",
					"extend",
					"content",
					"else",
					"if",
					"each",
					"for",
					"while",
				],
			},
		],
		"no-empty-source": null,
	},
});
