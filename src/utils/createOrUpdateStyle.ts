import { clone } from './clone'
import { createSolidPaintStyle } from './createSolidPaintStyle'

export function createOrUpdateStyle( name: string, color: RGB, styles: PaintStyle[] ) {
	// Index of existing style if it was already populated
	const idx = styles.findIndex( ( style ) => {
		return style.name === name
	} )

	// If the style already exists
	if( idx > -1 ) {
		// Clone the paints array (This is necessary in Figma)
		const paintCopy = clone( styles[idx].paints )
		// Set color in clone
		paintCopy[0].color = color
		// Copy new array to global styles
		styles[idx].paints = paintCopy
	} else {
		createSolidPaintStyle( name, color )
	}
}