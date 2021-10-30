import { defineStore } from 'pinia'
import * as data from '../mock-data/data'
import { Themes } from '../types/Theme'

// Grab initial theme state, or set to empty
const themes: Themes = data.themes || {}

export const useThemesStore = defineStore( {
	id: 'themes',
	state: () => ( {
		themes,
	} ),
	getters: {
		//...
	},
	actions: {
		//...
	},
} )