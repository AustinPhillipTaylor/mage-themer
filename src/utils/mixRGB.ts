// Function to mix two hex color values
export function mixRGB( colorA: RGB, colorB: RGB, weight = 50 ): RGB {

	weight = weight / 100


	const r = combineAndWeight( colorA.r, colorB.r ) / 255
	const g = combineAndWeight( colorA.g, colorB.g ) / 255
	const b = combineAndWeight( colorA.b, colorB.b ) / 255


	/**
	 * This is an implementation equal to how SASS mixes RGB colors, without alpha support
	 * https://github.com/sass/dart-sass/blob/3916ff6a0c4cf65b39a1b6e6c76e5fb54c423075/lib/src/functions/color.dart#L801
	 */
	 function combineAndWeight( base: number, mixin: number ) {
		base = Math.round( base * 255 )
		mixin = Math.round( mixin * 255 )
		return Math.round( base * weight + mixin * ( 1 - weight ) )
	}

	return { r, g, b }

}