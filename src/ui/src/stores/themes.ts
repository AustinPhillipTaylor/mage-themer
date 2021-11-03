import { defineStore } from 'pinia'
import * as data from '../mock-data/data'
import { Themes } from '../types/Theme'

const themeStorageKey = 'theme-styles-themes'

// Grab initial theme state, or set to empty
const themes: Themes = {}

export const useThemesStore = defineStore( {
	id: 'themes',
	state: () => ( {
		themes,
	} ),
	getters: {
		storageKey: () => themeStorageKey,
	},
	actions: {
		//...
	},
} )