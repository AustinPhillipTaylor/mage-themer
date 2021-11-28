import { defineStore } from 'pinia'
import { Palettes } from '../types/Palette'
import { v4 as uuidv4 } from 'uuid'
import { readLocal } from '../utils/localStorage'
import { useAppStore } from './app'

const paletteStorageKey = 'theme-styles-palettes'


// TODO: Save palettes and themes to local storage on change


// Grab initial palette state, or set to empty
const palettes: Palettes = await readLocal( paletteStorageKey ) || {}

export const usePalettesStore = defineStore( {
	id: 'palettes',
	state: () => ( {
		palettes,
	} ),
	getters: {

	},
	actions: {
		addPalette() {
			const guid = uuidv4()
			const appStore = useAppStore()
			const newPalette = {
				guid,
				name: 'Untitled Palette',
				colors: {},
			}
			this.palettes[guid] = newPalette

			// Set new palette to current view after creation
			appStore.setAppView( 'palette', newPalette.name, guid )
			return newPalette
		},
		addPaletteColor( guid: string ) {
			const colorGUID = uuidv4()
			const newColor = {
				guid: colorGUID,
				name: '',
				rgb: {
					r: 255,
					g: 255,
					b: 255,
				},
			}
			this.palettes[guid].colors[colorGUID] = newColor

			return newColor
		},
		importPalettes( addedPalettes: Palettes ) {
			const appStore = useAppStore()

			const newPaletteSet = {
				...this.palettes,
				...addedPalettes,
			}
			this.palettes = newPaletteSet

			// Force component update
			appStore.updateViewKey()
		},
	},
} )