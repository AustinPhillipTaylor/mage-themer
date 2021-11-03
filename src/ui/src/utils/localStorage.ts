import { postMessageResponse } from './postMessageResponse'

export async function readLocal( storageKey: string ) {
	const localRead = await postMessageResponse( {
		type: 'readLocal',
		storageKey,
	} )
	if( localRead ) {
		if( localRead.data ) return localRead.data
		if( localRead.error ) {
			console.error( localRead.error )
		}
	}
	return false
}

export async function saveLocal( storageKey: string, data: string ) {
	const localSave = await postMessageResponse( {
		type: 'saveLocal',
		storageKey,
		data,
	} )
	if( localSave ) {
		if( localSave.data ) return localSave.data
		if( localSave.error ) {
			console.error( localSave.error )
		}
	}
	return false
}