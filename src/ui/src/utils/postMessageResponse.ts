import { v4 as uuidv4 } from 'uuid'
import { FigmaMessage, MessageWaitingForResponse } from '../types/FigmaMessage'
import { sendFigmaMessage } from './sendFigmaMessage'

export function postMessageResponse( message: FigmaMessage ): Promise<MessageWaitingForResponse | false> {

	/**
	 * Figma works in such a way that MessageChannel will not work, so in
	 * order to check if we're getting a message back in response to this
	 * one, we'll add a unique identifier that must be sent back.
	 */
	const identifier = uuidv4()
	message.messageIdentifier = identifier

	return new Promise( ( resolve ) => {

		/**
		 * Start counting, if 7 seconds passes without a response,
		 * remove listener and resolve with false
		 */
		const timeout = setTimeout( () => {
			removeMessageListener()
			resolve( false )
		}, 7000 )

		// Start listening for messages
		window.addEventListener( 'message', callback )

		function callback( event: MessageEvent ) {
			// If we got a message, check if message ID matches
			if( event.data.pluginMessage.messageIdentifier === identifier ) {
				// If ID matches, clear timeout, remove listener and respond
				clearTimeout( timeout )
				removeMessageListener()
				resolve( event.data.pluginMessage )
			}
		}

		function removeMessageListener() {
			window.removeEventListener( 'message', callback )
		}

		// Post the message that should receive the response
		sendFigmaMessage( message as MessageWaitingForResponse )
	} )
}