const paletteFolder = "Palette"
const step = 5
const styles = figma.getLocalPaintStyles()
const lightMixColor = "#ffffff"
const darkMixColor  = "#2E3C43"

const palette: Palette[] = styles
	// Only grab colors in palette folder
	.filter( style => nameParts(style.name)[0] === paletteFolder)
	// Map to more manageable format
	.map( style => ({
		name: nameParts(style.name).slice(1),
		color: style.paints[0].color
	}))

let variants: ColorVariant[] = []

// Generate Light theme
palette.forEach( (mainColor: Palette) => {
	// Light tinted variations, 0-99
	for(let i = 1; i < 100; i++){
		if( i % step === 0 ){
			variants.push({
				name: mainColor.name,
				color: mixRGB(
					hexToRGB(lightMixColor),
					mainColor.color,
					100 - i,
				),
				theme: "Light",
				step: i,
			})
		}
	}
	variants.push({
		name: mainColor.name,
		color: mainColor.color,
		theme: "Light"
	})
	// dark tinted variations, 101-199
	for(let i = 1; i < 100; i++){
		if( i % step === 0 ){
			variants.push({
				name: mainColor.name,
				color: mixRGB(
					hexToRGB(darkMixColor),
					mainColor.color,
					i,
				),
				theme: "Light",
				step: 100 + i,
			})
		}
	}
})


// Generate Light theme
palette.forEach( (mainColor: Palette) => {
	// Light tinted variations, 0-99
	for(let i = 1; i < 100; i++){
		if( i % step === 0 ){
			variants.push({
				name: mainColor.name,
				color: mixRGB(
					hexToRGB(darkMixColor),
					mainColor.color,
					100 - i,
				),
				theme: "Dark",
				step: i,
			})
		}
	}
	variants.push({
		name: mainColor.name,
		color: mainColor.color,
		theme: "Dark"
	})
	// dark tinted variations, 101-199
	for(let i = 1; i < 100; i++){
		if( i % step === 0 ){
			variants.push({
				name: mainColor.name,
				color: mixRGB(
					hexToRGB(lightMixColor),
					mainColor.color,
					i,
				),
				theme: "Dark",
				step: 100 + i,
			})
		}
	}
})

// Generate paint styles from list of variants
variants.forEach( variant => {
	// Folder list of variant
	let folderList = [ ...variant.name ]
	// Initialize name list
	let nameList = []
	/**
	 * The variant name will start with whatever was last in the style name,
	 * add it and then remove that last item from the array.
	 */
	let variantName = folderList.slice(-1)[0]
	folderList.pop()
	// If there's a step in the variant, add it to the name
	if(variant.step){
		variantName += `-${variant.step}`
	}

	// The variant folder structure will begin with the theme name
	nameList.push( variant.theme )
	// If there are any items left in the original name, add them
	nameList.push( ...folderList )
	// Finally, add the variant name
	nameList.push( variantName )

	const finalName = nameList.join("/")

	// Index of existing style if it was already populated
	const idx = styles.findIndex( style => {
		return style.name === finalName
	})

	// If the style already exists
	if(idx > -1){
		// Clone the paints array (This is necessary in Figma)
		const paintCopy = clone(styles[idx].paints)
		// Set color in clone
		paintCopy[0].color = variant.color
		// Copy new array to global styles
		styles[idx].paints = paintCopy
	} else {
		createSolidPaintStyle( finalName, variant.color )
	}

});


interface RGB {
  r: number
  g: number
  b: number
}

interface ColorVariant {
	name: string[],
	color: RGB,
	theme: "Light" | "Dark",
	step?: number
}

interface Palette {
	name: string[],
	color: RGB,
}

// Utility to split styles names by folder delimiter
function nameParts(name: string) {
	const nameParts = name.split('/').filter((part: string) => !!part)
	return nameParts.map((part: string) => part.trim())
}

// Function to mix two hex color values
function mixRGB(colorA: RGB, colorB: RGB, weight = 50): RGB {

	weight = weight / 100


	const r = combineAndWeight( colorA.r, colorB.r ) / 255
	const g = combineAndWeight( colorA.g, colorB.g ) / 255
	const b = combineAndWeight( colorA.b, colorB.b ) / 255


	/**
	 * This is an implementation equal to how SASS mixes RGB colors, without alpha support
	 * https://github.com/sass/dart-sass/blob/3916ff6a0c4cf65b39a1b6e6c76e5fb54c423075/lib/src/functions/color.dart#L801
	 */
	 function combineAndWeight(base, mixin){
		base = Math.round(base * 255)
		mixin = Math.round(mixin * 255)
		return Math.round( base * weight + mixin * (1 - weight) )
	}

	return { r, g, b }

}

/**
 * Convert hex value to rgb in form
 * {
 * 		r: 1,
 * 		g: 1,
 * 		b: 1
 * }
 * Where r, g, and b are a value between 0 and 1
 */
function hexToRGB( hex: string ): RGB {

	// Strip hash if color is passed with leading hash
	const stripHash = (hexString: string) => {
		if(hexString[0] === '#') return hexString.substring(1)
		return hexString
	}

	const color = stripHash(hex)

	return {
		r: parseInt( color.substr(0, 2), 16 ) / 255,
		g: parseInt( color.substr(2, 2), 16 ) / 255,
		b: parseInt( color.substr(4, 2), 16 ) / 255
	}

}

// Generate Figma paint style
function createSolidPaintStyle( name: string, color: RGB) {
	const style = figma.createPaintStyle()
	style.name = name
	style.paints = [{
		type: "SOLID",
		color
	}]
}

function clone(val) {
  const type = typeof val
  if (val === null) {
    return null
  } else if (type === 'undefined' || type === 'number' ||
             type === 'string' || type === 'boolean') {
    return val
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x))
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val)
    } else {
      let o = {}
      for (const key in val) {
        o[key] = clone(val[key])
      }
      return o
    }
  }
  throw 'unknown'
}
