import { ColorStyle } from '../types/ColorStyle'
import { postMessageResponse } from './postMessageResponse'

export async function generateStyles( colorStyles: ColorStyle[] ) {
	const generateStyles = await postMessageResponse( {
		type: 'generateStyles',
		data: JSON.stringify( colorStyles ),
	} )
	if( generateStyles ) {
		if( generateStyles.data ) return generateStyles.data
		if( generateStyles.error ) {
			console.error( generateStyles.error )
		}
	}
	return false
}