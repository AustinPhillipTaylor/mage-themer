export async function readLocal( storageKey: string, id: string ) {
	try {
		// Make sure key is a string, to ensure there are no descrepencies with the UI
		if( typeof storageKey !== 'string' ) {
			throw new Error( 'Could not read data: Expected storage key of type String' )
		}

		// Try reading data
		const data = await figma.clientStorage.getAsync( storageKey )

		// If successful, send message to UI. Return retrieved data.
		figma.ui.postMessage( {
			type: 'readLocal',
			messageIdentifier: id,
			data,
		} )

	} catch ( e: any ) {
		figma.ui.postMessage( {
			type: 'readLocal',
			messageIdentifier: id,
			error: e.message,
		} )
	}
}

export async function saveLocal( storageKey: string, id: string, data: string  ) {
	try {
		// Make sure key and data are strings, for both security
		// and to ensure there are no issues when read back by the UI
		if( typeof storageKey !== 'string' ) {
			throw new Error( 'Could not save data: Expected storage key of type String' )
		}
		if( typeof data !== 'string'  ) {
			throw new Error( 'Could not save data: Expected data to be of type String. Try using JSON.stringify().' )
		}

		// Try saving data
		await figma.clientStorage.setAsync( storageKey, data )

		// If we got here, we were successful, send message to UI. Return with original data.
		figma.ui.postMessage( {
			type: 'saveLocal',
			messageIdentifier: id,
			data,
		} )

	} catch ( e: any ) {
		figma.ui.postMessage( {
			type: 'saveLocal',
			messageIdentifier: id,
			error: e.message,
		} )
	}

}