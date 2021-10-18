module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true,
	},
	"extends": [
		"plugin:@typescript-eslint/recommended",
	],
	"parserOptions": {
		"ecmaVersion": 12,
		"parser": "@typescript-eslint/parser",
		"sourceType": "module",
	},
	"plugins": [
		"json-format",
		"@typescript-eslint",
	],
	"rules": {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"@typescript-eslint/camelcase": 0,
		"@typescript-eslint/no-use-before-define": 0,
		"@typescript-eslint/ban-ts-ignore": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/no-var-requires": 0,
		"comma-dangle": [
			"error",
			{
				"arrays": "always-multiline",
				"exports": "always-multiline",
				"functions": "never",
				"imports": "always-multiline",
				"objects": "always-multiline",
			},
		],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"indent": [
			"error",
			"tab",
		],
		"linebreak-style": [
			"error",
			"unix",
		],
		"quotes": [
			"error",
			"double",
		],
		"semi": [
			"error",
			"never",
		],
		"semi": "off",
		"@typescript-eslint/semi": [
		  "error",
		  "never",
		],
		"@typescript-eslint/no-non-null-assertion": "off",
		"arrow-parens": [
		  "error",
		  "always",
		],
		"template-curly-spacing": [
		  "error",
		  "always",
		],
		"object-curly-spacing": [
		  "error",
		  "always",
		  {
		    "arraysInObjects": false,
		    "objectsInObjects": false,
		  },
		],
		"array-bracket-spacing": [
		  "error",
		  "always",
		  {
		    "singleValue": false,
		    "objectsInArrays": false,
		    "arraysInArrays": false,
		  },
		],
		"computed-property-spacing": [
		  "error",
		  "never",
		],
		"space-in-parens": [
		  "error",
		  "always",
		  {
		    "exceptions": [
		      "empty",
		    ],
		  },
		],
		"space-before-function-paren": [
		  "error",
		  {
		    "anonymous": "never",
		    "named": "never",
		    "asyncArrow": "always",
		  },
		],
		"space-before-blocks": [
		  "error",
		  "always",
		],
		"@typescript-eslint/member-delimiter-style": [
		  "error",
		  {
		    "multiline": {
		      "delimiter": "none",
		      "requireLast": true,
		    },
		    "singleline": {
		      "delimiter": "semi",
		      "requireLast": false,
		    },
		  },
		],
	},
	parserOptions: {
		parser: "@typescript-eslint/parser",
	},
}
