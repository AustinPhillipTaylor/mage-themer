import { defineStore } from 'pinia'
import * as data from '../mock-data/data'
import { Palettes } from '../types/Palette'

// Grab initial palette state, or set to empty
const palettes: Palettes =  {}

export const usePalettesStore = defineStore( {
	id: 'palettes',
	state: () => ( {
		palettes,
	} ),
	getters: {
		//...
	},
	actions: {
		//...
	},
} )