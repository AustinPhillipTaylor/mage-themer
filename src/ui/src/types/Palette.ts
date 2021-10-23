interface PaletteColor {
	/** Unique Identifier */
	guid: string
	/** Display Name */
	name: string
	/** RGB object representation of color. RGB values are values between 0 and 1 */
	rgb: RGB
}

export interface Palette {
	/** Unique Identifier */
	guid: string
	/** Display Name */
	name: string
	/** Array of palette colors */
	colors: Array<PaletteColor>
}