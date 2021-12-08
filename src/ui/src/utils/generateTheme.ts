import { Palette, PaletteColors } from '../types/Palette'
import { ColorVariation, NamingScheme, Theme } from '../types/Theme'
import { resolveName } from './resolveName'
import { unescapeEntities as _U } from './escapeEntities'
import { ColorEntries } from '../types/Generation'
import { mix } from 'tinycolor2'
import { ColorList } from '../types/ColorList'

export function generateTheme( mainColors: PaletteColors, mixColors: PaletteColors, mainName: string, mixName: string, themeName: string, namingScheme: NamingScheme, variations: ColorVariation[] ): ColorList  {
	const colorList = {}

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
			// List of name parts
			const dirList = resolvedName
				.split( '/' )
				.map( ( dir ) => _U( dir ) )
			// Rip off last entry and store here
			const styleName = dirList.pop()
			// Temporary reference to sub-entry in colorList,
			// Starts at root, then we walk through/set directories
			// in the following for loop.
			let objPath: any = colorList
			for( const dir of dirList ) {
				if( dir ) {
					// If path doesn't exist, create it
					if( !objPath[dir] ) {
						objPath[dir] = {}
					}
					// Set reference to sub-entry in colorList, based on
					// key of dirList
					objPath = objPath[dir]
				}
			}
			if( !objPath.styles  ) {
				objPath.styles = []
			}
			objPath.styles.push( {
				name: styleName,
				rgb: mix( color, mixColors[variation.mixingColor].rgb, variation.percentage ).toRgb(),
			} as ColorEntries )
		}
	}
	return colorList
}