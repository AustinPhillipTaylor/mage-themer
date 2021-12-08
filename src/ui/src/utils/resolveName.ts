import { NamingScheme } from '../types/Theme'
import { escapeEntities as _E } from './escapeEntities'


export function resolveName(
	namingScheme: NamingScheme,
	themeName: string,
	mainPaletteName: string,
	mixPaletteName: string,
	paletteColorName: string,
	mixColorName: string,
	percentage: string | number,
	label: string
) {
	let finishedName = ''
	for( const part of namingScheme ) {
		if( part.type === 'text' ) {
			finishedName += part.text
		}
		if( part.type === 'template' ) {
			switch( part.template ) {
				case 'theme-name':
					finishedName += _E( themeName )
					break
				case 'main-palette-name':
					finishedName += _E( mainPaletteName )
					break
				case 'mix-palette-name':
					finishedName += _E( mixPaletteName )
					break
				case 'palette-color-name':
					finishedName += _E( paletteColorName )
					break
				case 'mix-color-name':
					finishedName += _E( mixColorName )
					break
				case 'percentage':
					finishedName += _E( percentage.toString() )
					break
				case 'label':
					finishedName += _E( label )
					break
			}
		}
	}
	return finishedName
}