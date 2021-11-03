import { defineStore } from 'pinia'
import * as data from '../mock-data/data'
import { Palettes } from '../types/Palette'
import { postMessageResponse } from '../utils/postMessageResponse'

const paletteStorageKey = 'theme-styles-palettes'

async function getLocalPalettes() {
	const localPaletteInfo = await postMessageResponse( {
		type: 'readLocal',
		storageKey: 'test',
	} )
	if( localPaletteInfo && localPaletteInfo.data ) {
		return localPaletteInfo.data
	}
	return false
}


// Grab initial palette state, or set to empty
const palettes: Palettes = await getLocalPalettes() || {}
console.log( 'my palettes:', palettes )

export const usePalettesStore = defineStore( {
	id: 'palettes',
	state: () => ( {
		palettes,
		storageKey: '',
	} ),
	getters: {
		storageKey: () => paletteStorageKey,
	},
	actions: {
		//...
	},
} )