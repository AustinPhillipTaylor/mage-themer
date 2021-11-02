import { ColorVariant } from "../types/colorVariant"
import { Palette } from "../types/palette"
import { hexToRGB } from "./hexToRGB"
import { mixRGB } from "./mixRGB"

export function generateThemeVariants( themeName: string, palette: Palette[], mixinColorA: string, mixinColorB: string, step: number ): ColorVariant[] {
	const variants: ColorVariant[] = []

	if( !( 0 < step ) || !( step < 100 ) ) throw "Step must be 1-99"

	// Loop through palette
	palette.forEach( ( mainColor: Palette ) => {
		// Variations 1-99, mixing in mixinColorA
		for( let i = 1; i < 100; i++ ) {
			if( i % step === 0 ) {
				variants.push( {
					name: mainColor.name,
					color: mixRGB(
						hexToRGB( mixinColorA ),
						mainColor.color,
						100 - i
					),
					theme: themeName,
					step: i,
				} )
			}
		}
		variants.push( {
			name: mainColor.name,
			color: mainColor.color,
			theme: themeName,
		} )
		// variations 101-199, mixing in mixinColorB
		for( let i = 1; i < 100; i++ ) {
			if( i % step === 0 ) {
				variants.push( {
					name: mainColor.name,
					color: mixRGB(
						hexToRGB( mixinColorB ),
						mainColor.color,
						i
					),
					theme: themeName,
					step: 100 + i,
				} )
			}
		}
	} )

	return variants

}