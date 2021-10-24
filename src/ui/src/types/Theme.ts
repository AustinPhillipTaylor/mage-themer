import { Palette, PaletteColor } from './Palette'

interface ColorVariation {
	/** Label identifier for color variation */
	label: string
	/** Reference to mixing color from mixing colors palette */
	mixingColor: PaletteColor
	/** Number 0-100, represents amount of mixingColor to add to base palette color */
	percentage: number
	/** If color variation should override theme naming scheme */
	customNamingScheme: boolean
	/** Variation-specific naming scheme */
	namingScheme?: string
}

export interface Theme {
	/** Unique identifier */
	guid: string
	/** Display name */
	name: string
	/** Reference to main color palette */
	palette: Palette
	/** Reference to mixing colors palette */
	mixingColors: Palette
	/**
	 * String representing naming scheme for color variations. Includes
	 * special character codes that can be replaced with the variable information.
	 */
	namingScheme: string
	/** Array of variations for theme */
	variationMapping: ColorVariation[]
}

export interface Themes {
	/** Each theme is referenced by its GUID */
	[key: string]: Theme
}