import { nameParts } from "./nameParts"
import { Palette } from "../types/palette"

export function getPalette( paletteFolder: string, styles: PaintStyle[] ): Palette[] {

	return styles
		// Only grab colors in palette folder with SolidPaint Paints[] type
		.filter( ( style ) => {
			return ( nameParts( style.name )[0] === paletteFolder ) && ( "color" in style.paints[0] )
		} )
		// Map to more manageable format
		.map( ( style ) => ( {
			name: nameParts( style.name ).slice( 1 ),
			// @ts-ignore: Check already made above
			color: style.paints[0].color,
		} ) )
}