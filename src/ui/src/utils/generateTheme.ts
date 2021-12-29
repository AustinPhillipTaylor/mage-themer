import { Palette, PaletteColors } from '../types/Palette'
import { ColorVariation, NamingScheme, Theme } from '../types/Theme'
import { resolveName } from './resolveName'
import { unescapeEntities as _U } from './escapeEntities'
import { ColorStyle } from '../types/ColorStyle'
import { mix } from 'tinycolor2'
import { ColorGroup } from '../types/ColorGroup'
import { dir } from 'console'

export function generateTheme( mainColors: PaletteColors, mixColors: PaletteColors, mainName: string, mixName: string, themeName: string, namingScheme: NamingScheme, variations: ColorVariation[] ): ColorGroup {
	const colorGroups: ColorGroup = {
		subGroups: [],
		styles: [],
	}

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
			// Temporary reference to colorGroup,
			// Starts at root, then we walk through/set
			// directories in the following for loop.
			let objPath: ColorGroup = colorGroups
			//let curGroup = {}
			for( const dir of dirList ) {
				if( dir ) {
					const dirIndex = objPath.subGroups.findIndex( ( elm ) => elm.groupName === dir )
					// If path doesn't exist, create it
					if( dirIndex < 0 ) {
						objPath.subGroups.push( {
							groupName: dir,
							subGroups: [],
							styles: [],
						} )
					}
					// Set reference to subGroup
					objPath = objPath.subGroups[dirIndex < 0 ? objPath.subGroups.length - 1 : dirIndex]
				}
			}
			objPath.styles.push( {
				name: styleName,
				color: mix( color, mixColors[variation.mixingColor].rgb, variation.percentage ).toRgb(),
			} as ColorStyle )
		}
	}
	return colorGroups
}