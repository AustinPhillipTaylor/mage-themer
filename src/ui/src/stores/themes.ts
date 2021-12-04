import { defineStore } from 'pinia'
import { Theme, Themes } from '../types/Theme'
import { v4 as uuidv4 } from 'uuid'
import { readLocal } from '../utils/localStorage'
import { useAppStore } from './app'

const themeStorageKey = 'theme-styles-themes'

// Grab initial theme state, or set to empty
const themes: Themes = await readLocal( themeStorageKey ) || {}

export const useThemesStore = defineStore( {
	id: 'themes',
	state: () => ( {
		themes,
	} ),
	getters: {

	},
	actions: {
		addTheme(): Theme {
			const guid = uuidv4()
			const appStore = useAppStore()
			const newTheme = {
				guid,
				name: '',
				themePalette: '',
				mixingPalette: '',
				namingScheme: [],
				variationMapping: [],
			}
			this.themes[guid] = newTheme

			// Set new palette to current view after creation
			appStore.setAppView( 'theme', newTheme.name, guid )
			return newTheme
		},
		updateTheme( guid: string, theme: Partial<Theme> ) {
			this.themes[guid] = {
				...this.themes[guid],
				...theme,
			}
		},
		importThemes( addedThemes: Themes ) {
			const appStore = useAppStore()

			const newThemeSet = {
				...this.themes,
				...addedThemes,
			}
			this.themes = newThemeSet

			// Force component update
			appStore.updateViewKey()
		},
		deleteTheme( guid: string ) {
			const appStore = useAppStore()
			appStore.setOverlay( 'confirmation-modal', {
				title: 'Delete Theme?',
				message: 'Theme deletion can not be undone. If removed, color styles already added to Figma will remain intact, and must be removed manually if you choose to do so.',
				buttons: {
					cancel: {
						text: 'Cancel Deletion',
					},
					confirm: {
						text: 'Delete Theme',
						callback: async () => {
							if( this.themes[guid] ) {
								if( guid === appStore.guid ) {
									await appStore.setAppView( 'dashboard' )
								}
								delete this.themes[guid]
							}
						},
					},
				},
			} )
		},
	},
} )