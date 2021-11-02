/**
 * Convert hex value to rgb in form
 * {
 * 		r: 1,
 * 		g: 1,
 * 		b: 1
 * }
 * Where r, g, and b are a value between 0 and 1
 */
export function hexToRGB( hex: string ): RGB {

	// Strip hash if color is passed with leading hash
	const stripHash = ( hexString: string ) => {
		if( hexString[0] === "#" ) return hexString.substring( 1 )
		return hexString
	}

	const color = stripHash( hex )

	return {
		r: parseInt( color.substr( 0, 2 ), 16 ) / 255,
		g: parseInt( color.substr( 2, 2 ), 16 ) / 255,
		b: parseInt( color.substr( 4, 2 ), 16 ) / 255,
	}

}