import Ajv from 'ajv'
import { paletteJSONSchema, Palettes } from '../../../types/Palette'
import { themeJSONSchema, Themes } from '../../../types/Theme'

export function parsingJSON( cancelled: boolean, rawText: string ): Promise<any> {
	return new Promise( ( resolve, reject ) => {
		if( cancelled ) {
			return reject( 'cancelled' )
		}
		try {
			const resolvedJSON = JSON.parse( rawText )
			return resolve( resolvedJSON )
		} catch {
			return reject( 'parsingJSON' )
		}
	} )
}
export function checkingPalettes( cancelled: boolean, parsedJSON: any ): Promise<any> {
	return new Promise( ( resolve, reject ) => {
		if( cancelled ) {
			return reject( 'cancelled' )
		}
		if( parsedJSON.palettes ) {
			const ajv = new Ajv()
			const validate = ajv.compile( paletteJSONSchema )
			const valid = validate( parsedJSON.palettes )
			if( valid ) {
				return resolve( parsedJSON )
			}
		}
	 return reject( 'checkingPalettes' )
	} )
}
export function checkingThemes( cancelled: boolean, parsedJSON: any ): Promise<any> {
	return new Promise( ( resolve, reject ) => {
		if( cancelled ) {
			return reject( 'cancelled' )
		}
		if( parsedJSON.themes ) {
			const ajv = new Ajv()
			const validate = ajv.compile( themeJSONSchema )
			const valid = validate( parsedJSON.themes )
			if( valid ) {
				return resolve( parsedJSON )
			}
		}
		return reject( 'checkingThemes' )
	} )
}

export function hasConflicts(
	parsedJSON: { palettes: Palettes; themes: Themes },
	palettes: Palettes,
	themes: Themes
) {
	const paletteKeys = Object.keys( palettes )
	const themeKeys = Object.keys( themes )
	const newPaletteKeys = Object.keys( parsedJSON.palettes )
	const newThemeKeys = Object.keys( parsedJSON.themes )

	const paletteOverlap = paletteKeys.filter(
		( key ) => {
			return newPaletteKeys.includes( key )
		} )

	const themeOverlap = themeKeys.filter(
		( key ) => {
			return newThemeKeys.includes( key )
		} )

	if( paletteOverlap.length > 0 || themeOverlap.length > 0 ) {
		return true
	}
	return false
}