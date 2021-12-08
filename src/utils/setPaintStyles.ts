import { ColorStyle } from '../types/ColorStyle'
import { createOrUpdateStyle } from './createOrUpdateStyle'

//TODO: Do a preliminary check to see if some colors aready exist. If they do, we need to let the user
// know that some styles will be updated if they proceed.

export function setPaintStyles( id: string, colorStyles: string ) {
	try {
		const parsedStyles: ColorStyle[] = JSON.parse( colorStyles )
		// Get list of paints from Figma
		const styles = figma.getLocalPaintStyles()
		// Generate paint styles from list of variants

		parsedStyles.forEach( ( style ) => {
			createOrUpdateStyle( style.name, style.color, styles )
		} )
		// If everything goes to plan, notify the UI
		figma.ui.postMessage( {
			type: 'generateStyles',
			messageIdentifier: id,
			data: { success: true },
		} )
	} catch ( e: any ) {
		figma.ui.postMessage( {
			type: 'generateStyles',
			messageIdentifier: id,
			error: e.message,
		} )
	}
}