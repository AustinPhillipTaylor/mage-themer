import { ItemTemplate, TextTemplate } from './TemplateInput'

export type NamingScheme = ( TextTemplate | ItemTemplate )[]

export interface ColorVariation {
	/** Unique identifier */
	guid: string
	/** Label identifier for color variation */
	label: string
	/** GUID of mixing color from mixing colors palette */
	mixingColor: string
	/** Number 0-100, represents amount of mixingColor to add to base palette color */
	percentage: number
	/** If color variation should override theme naming scheme */
	customNamingScheme: boolean
	/** Variation-specific naming scheme */
	namingScheme: NamingScheme
}

export interface Theme {
	/** Unique identifier */
	guid: string
	/** Display name */
	name: string
	/** GUID of main color palette */
	themePalette: string
	/** GUID of mixing colors palette */
	mixingPalette: string
	/**
	 * String representing naming scheme for color variations. Includes
	 * special character codes that can be replaced with the variable information.
	 */
	namingScheme: NamingScheme
	/** Array of variations for theme */
	variationMapping: ColorVariation[]
}

export interface Themes {
	/** Each theme is referenced by its GUID */
	[key: string]: Theme
}


export const themeJSONSchema = {
	'$schema': 'http://json-schema.org/draft-07/schema#',
	'additionalProperties': {
		'$ref': '#/definitions/Theme',
	},
	'definitions': {
		'ColorVariation': {
			'properties': {
				'customNamingScheme': {
					'description': 'If color variation should override theme naming scheme',
					'type': 'boolean',
				},
				'guid': {
					'description': 'Unique identifier',
					'type': 'string',
				},
				'label': {
					'description': 'Label identifier for color variation',
					'type': 'string',
				},
				'mixingColor': {
					'description': 'GUID of mixing color from mixing colors palette',
					'type': 'string',
				},
				'namingScheme': {
					'description': 'Variation-specific naming scheme',
					'items': {
						'anyOf': [
							{
								'$ref': '#/definitions/TextTemplate',
							},
							{
								'$ref': '#/definitions/ItemTemplate',
							},
						],
					},
					'type': 'array',
				},
				'percentage': {
					'description': 'Number 0-100, represents amount of mixingColor to add to base palette color',
					'type': 'number',
				},
			},
			'required': [
				'customNamingScheme',
				'guid',
				'label',
				'mixingColor',
				'namingScheme',
				'percentage',
			],
			'type': 'object',
		},
		'ItemTemplate': {
			'properties': {
				'template': {
					'type': 'string',
				},
				'type': {
					'enum': [
						'template',
					],
					'type': 'string',
				},
			},
			'required': [
				'template',
				'type',
			],
			'type': 'object',
		},
		'TextTemplate': {
			'properties': {
				'text': {
					'type': 'string',
				},
				'type': {
					'enum': [
						'text',
					],
					'type': 'string',
				},
			},
			'required': [
				'text',
				'type',
			],
			'type': 'object',
		},
		'Theme': {
			'properties': {
				'guid': {
					'description': 'Unique identifier',
					'type': 'string',
				},
				'mixingPalette': {
					'description': 'GUID of mixing colors palette',
					'type': 'string',
				},
				'name': {
					'description': 'Display name',
					'type': 'string',
				},
				'namingScheme': {
					'description': 'String representing naming scheme for color variations. Includes\nspecial character codes that can be replaced with the variable information.',
					'items': {
						'anyOf': [
							{
								'$ref': '#/definitions/TextTemplate',
							},
							{
								'$ref': '#/definitions/ItemTemplate',
							},
						],
					},
					'type': 'array',
				},
				'themePalette': {
					'description': 'GUID of main color palette',
					'type': 'string',
				},
				'variationMapping': {
					'description': 'Array of variations for theme',
					'items': {
						'$ref': '#/definitions/ColorVariation',
					},
					'type': 'array',
				},
			},
			'required': [
				'guid',
				'mixingPalette',
				'name',
				'namingScheme',
				'themePalette',
				'variationMapping',
			],
			'type': 'object',
		},
	},
	'type': 'object',
}