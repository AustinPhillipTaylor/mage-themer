import { FigmaMessage, MessageWaitingForResponse } from '../types/FigmaMessage'

export function sendFigmaMessage( message: FigmaMessage | MessageWaitingForResponse ) {
	parent.postMessage( { pluginMessage: message }, '*' )
}