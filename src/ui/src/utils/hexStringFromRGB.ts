import tinyColor from 'tinycolor2'

export function hexStringFromRGB( color: RGB ) {
	return tinyColor( color ).toHexString().toUpperCase()
}