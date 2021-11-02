import { ColorVariant } from "../types/colorVariant"

export function generateVariantName( variant: ColorVariant ) {
	// Folder list of variant
	const folderList = [...variant.name]
	// Initialize name list
	const nameList = []
	/**
	 * The variant name will start with whatever was last in the style name.
	 * Add it and then remove that last item from the array.
	 */
	let variantName = folderList.slice( -1 )[0]
	folderList.pop()
	// If there's a step in the variant, add it to the name
	if( variant.step ) {
		variantName += `-${ variant.step }`
	}

	// The variant folder structure will begin with the theme name
	nameList.push( variant.theme )
	// If there are any items left in the original name, add them
	nameList.push( ...folderList )
	// Finally, add the variant name
	nameList.push( variantName )

	// The style name in Figma is a single string with folder structure denoted by slashes
	return nameList.join( "/" )
}