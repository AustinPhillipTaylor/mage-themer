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
				name: '',
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
		deletePalette( guid: string ) {
			const appStore = useAppStore()
			appStore.setOverlay( 'confirmation-modal', {
				title: 'Delete Palette?',
				message: 'Palette deletion can not be undone. If removed, any themes that utilize this palette will need to be updated before Figma styles can be generated for the affected themes.',
				buttons: {
					cancel: {
						text: 'Cancel Deletion',
					},
					confirm: {
						text: 'Delete Palette',
						callback: async () => {
							if( this.palettes[guid] ) {
								if( guid === appStore.guid ) {
									await appStore.setAppView( 'dashboard' )
								}
								delete this.palettes[guid]
							}
						},
					},
				},
			} )
		},
		deleteSwatch( paletteGUID: string, swatchGUID: string ) {
			const appStore = useAppStore()
			appStore.setOverlay( 'confirmation-modal', {
				title: 'Delete Swatch?',
				message: 'Swatch deletion can not be undone. If removed, themes that utilize this swatch may need to be updated before Figma styles can be generated for the affected themes.',
				buttons: {
					cancel: {
						text: 'Cancel Deletion',
					},
					confirm: {
						text: 'Delete Swatch',
						callback: async () => {
							if( this.palettes[paletteGUID] && this.palettes[paletteGUID].colors[swatchGUID] ) {
								delete this.palettes[paletteGUID].colors[swatchGUID]
							}
						},
					},
				},
			} )
		},

	},
} )