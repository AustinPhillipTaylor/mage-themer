interface ColorVariation {
	/** Label identifier for color variation */
	label: string
	/** GUID of mixing color from mixing colors palette */
	mixingColor: string
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
	/** GUID of main palette */
	palette: string
	/** GUID of mixing colors palette */
	mixingColors: string
	/**
	 * String representing naming scheme for color variations. Includes
	 * special character codes that can be replaced with the variable information.
	 */
	namingScheme: string
	/** Array of variations for theme */
	variationMapping: ColorVariation[]
}