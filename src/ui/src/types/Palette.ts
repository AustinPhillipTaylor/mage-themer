export interface PaletteColor {
	/** Unique Identifier */
	guid: string
	/** Display Name */
	name: string
	/** RGB object representation of color. RGB values are values between 0 and 255 */
	rgb: RGB
}

export interface PaletteColors {
	/** Each palette color is referenced by its GUID */
	[key: string]: PaletteColor
}

export interface Palette {
	/** Unique Identifier */
	guid: string
	/** Display Name */
	name: string
	/** Array of palette colors */
	colors: PaletteColors
}

export interface Palettes {
	/** Each palette is referenced by its GUID */
	[key: string]: Palette
}

export const paletteJSONSchema = {
	'$schema': 'http://json-schema.org/draft-07/schema#',
	'additionalProperties': {
		'$ref': '#/definitions/Palette',
	},
	'definitions': {
		'Palette': {
			'properties': {
				'colors': {
					'$ref': '#/definitions/PaletteColors',
					'description': 'Array of palette colors',
				},
				'guid': {
					'description': 'Unique Identifier',
					'type': 'string',
				},
				'name': {
					'description': 'Display Name',
					'type': 'string',
				},
			},
			'type': 'object',
		},
		'PaletteColor': {
			'properties': {
				'guid': {
					'description': 'Unique Identifier',
					'type': 'string',
				},
				'name': {
					'description': 'Display Name',
					'type': 'string',
				},
				'rgb': {
					'$ref': '#/definitions/RGB',
					'description': 'RGB object representation of color. RGB values are values between 0 and 255',
				},
			},
			'type': 'object',
		},
		'PaletteColors': {
			'additionalProperties': {
				'$ref': '#/definitions/PaletteColor',
			},
			'type': 'object',
		},
		'RGB': {
			'properties': {
				'b': {
					'type': 'number',
				},
				'g': {
					'type': 'number',
				},
				'r': {
					'type': 'number',
				},
			},
			'type': 'object',
		},
	},
	'type': 'object',
}