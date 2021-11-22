import Ajv from 'ajv'
import { paletteJSONSchema } from '../../../types/Palette'
import { themeJSONSchema } from '../../../types/Theme'

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