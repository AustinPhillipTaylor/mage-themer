import { PaletteColors } from '../types/Palette'
import { ColorVariation, NamingScheme, Theme } from '../types/Theme'
import { resolveName } from './resolveName'
import { unescapeEntities as _U } from './escapeEntities'
import { mix } from 'tinycolor2'
import { ColorStyle } from '../types/ColorStyle'

export function generateFigmaTheme( mainColors: PaletteColors, mixColors: PaletteColors, mainName: string, mixName: string, themeName: string, namingScheme: NamingScheme, variations: ColorVariation[], useRatio = true ): ColorStyle[]  {
	const colorStyles: ColorStyle[] = []

	// Loop through main palette
	for( const guid in mainColors ) {
		const color = mainColors[guid].rgb
		// Loop through all variations for each palette color
		for( const variation of variations ) {
			// Use custom naming scheme if enabled for variation
			const whichNamingScheme = ( () => {
				if( variation.customNamingScheme ) {
					return variation.namingScheme
				}
				return namingScheme
			} )()
			const resolvedName = resolveName(
				whichNamingScheme,
				themeName,
				mainName,
				mixName,
				mainColors[guid].name,
				mixColors[variation.mixingColor].name,
				variation.percentage,
				variation.label
			)
			const mixedColor = mix( color, mixColors[variation.mixingColor].rgb, variation.percentage ).toRgb()
			colorStyles.push( {
				name: resolvedName,
				color: {
					// Figma utilizes an RGB ratio, each value needs to be between 0 and 1,
					// we can turn this off by setting useRatio to false
					r: mixedColor.r / ( useRatio ? 255 : 1 ),
					g: mixedColor.g / ( useRatio ? 255 : 1 ),
					b: mixedColor.b / ( useRatio ? 255 : 1 ),
				},
			} )
		}
	}
	return colorStyles
}