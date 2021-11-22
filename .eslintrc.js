module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true,
	},
	'overrides': [{
		'files': [ '*.json', '*.jsonc' ],
		'extends': 'plugin:jsonc/recommended-with-jsonc',
		'parser': 'jsonc-eslint-parser',
		'rules': {
			'jsonc/comma-dangle': [
				'error',
				'never',
			],
			'jsonc/indent': [
				'error',
				'tab',
			],
		},
	}],
	'extends': [
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential',
	],
	'parserOptions': {
		'ecmaVersion': 12,
		'parser': '@typescript-eslint/parser',
		'sourceType': 'module',
	},
	'plugins': [
		'@typescript-eslint',
		'vue',
	],
	'rules': {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/no-use-before-define': 0,
		'@typescript-eslint/ban-ts-ignore': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-var-requires': 0,
		'vue/valid-v-slot': 0,
		'comma-dangle': [
			'error',
			{
				'arrays': 'always-multiline',
				'exports': 'always-multiline',
				'functions': 'never',
				'imports': 'always-multiline',
				'objects': 'always-multiline',
			},
		],
		'object-property-newline': [
			'error',
		],
		'object-curly-newline': [
			'error', {
				'ObjectExpression': {
					'consistent': true,
					'multiline': true,
				},
				'ObjectPattern': {
					'multiline': true,
				},
				'ImportDeclaration': {
					'consistent': true,
				},
				'ExportDeclaration': {
					'consistent': true,
				},
			},
		],
		'array-bracket-newline': [
			'error',
			'consistent',
		],
		'array-element-newline': [
			'error',
			'consistent',
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1,
			},
		],
		'linebreak-style': [
			'error',
			'unix',
		],
		'quotes': [
			'error',
			'single',
		],
		'semi': [
			'error',
			'never',
		],
		'vue/array-bracket-newline': [ 'error', 'consistent' ],
		'vue/object-property-newline': [
			'error', {
				'allowAllPropertiesOnSameLine': false,
			},
		],
		'vue/html-indent': [
			'error',
			'tab',
			{
				'attribute': 1,
				'baseIndent': 1,
				'closeBracket': 0,
				'alignAttributesVertically': true,
				'ignores': [],
			},
		],
		'vue/max-attributes-per-line': [
			'error',
			{
				'singleline': {
					'max': 1,
					'allowFirstLine': true,
				},
				'multiline': {
					'max': 1,
					'allowFirstLine': false,
				},
			},
		],
		'vue/html-closing-bracket-newline': [
			'error',
			{
				'singleline': 'never',
				'multiline': 'always',
			},
		],
		'vue/mustache-interpolation-spacing': [ 'error' ],
		'vue/no-multi-spaces': [
			'error',
			{
				'ignoreProperties': false,
			},
		],
		'semi': 'off',
		'@typescript-eslint/semi': [
		  'error',
		  'never',
		],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'arrow-parens': [
		  'error',
		  'always',
		],
		'template-curly-spacing': [
		  'error',
		  'always',
		],
		'object-curly-spacing': [
		  'error',
		  'always',
		  {
		    'arraysInObjects': false,
		    'objectsInObjects': false,
		  },
		],
		'array-bracket-spacing': [
		  'error',
		  'always',
		  {
		    'singleValue': true,
		    'objectsInArrays': false,
		    'arraysInArrays': false,
		  },
		],
		'computed-property-spacing': [
		  'error',
		  'never',
		],
		'space-in-parens': [
		  'error',
		  'always',
		  {
		    'exceptions': [ 'empty' ],
		  },
		],
		'space-before-function-paren': [
		  'error',
		  {
		    'anonymous': 'never',
		    'named': 'never',
		    'asyncArrow': 'always',
		  },
		],
		'space-before-blocks': [
		  'error',
		  'always',
		],
		'@typescript-eslint/member-delimiter-style': [
		  'error',
		  {
		    'multiline': {
		      'delimiter': 'none',
		      'requireLast': true,
		    },
		    'singleline': {
		      'delimiter': 'semi',
		      'requireLast': false,
		    },
		  },
		],
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
}
