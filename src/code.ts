import { ColorVariant } from "./types/colorVariant"
import { createOrUpdateStyle } from "./utils/createOrUpdateStyle"
import { generateThemeVariants } from "./utils/generateThemeVariants"
import { generateVariantName } from "./utils/generateVariantName"
import { getPalette } from "./utils/getPalette"

const paletteFolder = "Palette"
const step = 5
const lightMixColor = "#ffffff"
const darkMixColor  = "#2E3C43"

// This shows the HTML page in "ui.html".
figma.showUI( __html__ )


function setPaintStyles() {
	const variants: ColorVariant[] = []
	const styles = figma.getLocalPaintStyles()
	const palette = getPalette( paletteFolder, styles )
	variants.push(
		...generateThemeVariants( "Light", palette, lightMixColor, darkMixColor, step ),
		...generateThemeVariants( "Dark", palette, darkMixColor, lightMixColor, step )
	)

	// Generate paint styles from list of variants
	variants.forEach( ( variant ) => {
		const name = generateVariantName( variant )
		createOrUpdateStyle( name, variant.color, styles )
	} )
}


// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = ( msg ) => {
	// One way of distinguishing between different types of messages sent from
	// your HTML page is to use an object with a "type" property like this.
	if ( msg.type === "generate-styles" ) {
		setPaintStyles()
		// const nodes: SceneNode[] = []
		// for ( let i = 0; i < msg.count; i++ ) {
		// 	const rect = figma.createRectangle()
		// 	rect.x = i * 150
		// 	rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 }}]
		// 	figma.currentPage.appendChild( rect )
		// 	nodes.push( rect )
		// }
		// figma.currentPage.selection = nodes
		// figma.viewport.scrollAndZoomIntoView( nodes )
	}
	if ( msg.type === "close" ) {
		// Make sure to close the plugin when you're done. Otherwise the plugin will
		// keep running, which shows the cancel button at the bottom of the screen.
		figma.closePlugin()
	}

}