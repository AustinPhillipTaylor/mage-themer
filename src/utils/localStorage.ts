export async function readLocal( storageKey: string, id: string ) {
	try {
		// Make sure key is a string, to ensure there are no descrepencies with the UI
		if( typeof storageKey !== 'string' ) {
			throw new Error( 'Could read data: Expected storage key of type String' )
		}

		// Try reading data
		const data = await figma.clientStorage.getAsync( storageKey )

		// If successful, send message to UI. Return retrieved data.
		figma.ui.postMessage( {
			type: 'readLocal',
			messageIdentifier: id,
			data,
		} )

	} catch ( e ) {
		console.log( e )
	}
}

export async function saveLocal( storageKey: string, data: string, id: string  ) {
	try {
		// Make sure key and data are strings, for both security
		// and to ensure there are no issues when read back by the UI
		if( typeof storageKey !== 'string' || typeof data !== 'string' ) {
			throw new Error( 'Could not save data' )
		}

		// Try saving data
		await figma.clientStorage.setAsync( storageKey, data )

		// If we got here, we were successful, send message to UI. Return with original data.
		figma.ui.postMessage( {
			type: 'saveLocal',
			messageIdentifier: id,
			data,
		} )

	} catch ( e ) {
		console.log( e )
	}

}