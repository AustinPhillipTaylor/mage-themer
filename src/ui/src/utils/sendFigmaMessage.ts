import { FigmaMessage, MessageWaitingForResponse } from '../types/FigmaMessage'

export function sendFigmaMessage( message: FigmaMessage | MessageWaitingForResponse ) {
	if( window.parent === window ) {
		console.warn( 'Window and parent are same context: postMessage is posting to self. Messages are compatible, however, no information will be saved, read, or otherwise returned from Figma.' )
	}
	parent.postMessage( { pluginMessage: message }, '*' )
}