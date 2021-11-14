export interface PaletteColor {
	/** Unique Identifier */
	guid: string
	/** Display Name */
	name: string
	/** RGB object representation of color. RGB values are values between 0 and 255 */
	rgb: RGB
}

interface PaletteColors {
	/** Each palette color is referenced by its GUID */
	[guid: string]: PaletteColor
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
	[guid: string]: Palette
}