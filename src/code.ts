import { saveLocal, readLocal } from './utils/localStorage'
import { setPaintStyles } from './utils/setPaintStyles'
import { resizerClicked, resizeWindow, windowSize } from './utils/windowResize'

// This shows the HTML page in "ui.html".
figma.showUI( __html__, {
	width: windowSize.windowWidth,
	height: windowSize.windowHeight,
} )

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = ( msg ) => {
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

	switch( msg.type ) {
		case 'close':
			figma.closePlugin()
			break
		case 'resizerClicked':
			resizerClicked()
			break
		case 'resizeWindow':
			resizeWindow( msg.widthAdd, msg.heightAdd )
			break
		case 'saveLocal':
			saveLocal( msg.storageKey, msg.messageIdentifier, msg.data )
			break
		case 'readLocal':
			readLocal( msg.storageKey, msg.messageIdentifier )
			break
		case 'generateStyles':
			setPaintStyles( msg.messageIdentifier, msg.data )
			break
	}

}