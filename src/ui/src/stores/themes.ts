import { defineStore } from 'pinia'
import { Theme, Themes, themeJSONSchema } from '../types/Theme'
import { v4 as uuidv4 } from 'uuid'
import { readLocal } from '../utils/localStorage'
import { useAppStore } from './app'
import { usePalettesStore } from './palettes'
import { generateTheme } from '../utils/generateTheme'
import { generateFigmaTheme } from '../utils/generateFigmaTheme'

export const themeStorageKey = 'theme-styles-themes'

// Grab initial theme state, or set to empty
const themes: Themes = await readLocal( themeStorageKey ) || {}

export const useThemesStore = defineStore( {
	id: 'themes',
	state: () => ( {
		themes,
	} ),
	getters: {
		themeErrors: ( state ) => {
			/**
			 * This will return an array of numbers corresponding to different errors
			 * (-1) -> Theme does not exist
			 * (1) -> GUID property not set
			 * (2) -> Theme palette not set
			 * (3) -> Theme palette does not exist
			 * (4) -> Theme palette has no colors defined
			 * (5) -> Mixing palette not set
			 * (6) -> Mixing palette does not exist
			 * (7) -> Mixing palette has no colors defined
			 * (8) -> Name is unset or empty
			 * (9) -> Naming scheme is unset or empty
			 * (10) -> Variations are unset or empty
			 * (11) -> Error in one or more variations
			 */
			return ( guid: string ) => {
				const required = themeJSONSchema.definitions.Theme.required
				const errors = []
				const paletteStore = usePalettesStore()
				const palettes = paletteStore.palettes
				function variationMixError( theme: Theme ) {
					for( const variation of theme.variationMapping ) {
						if( !variation.mixingColor ) {
							return true
						} else if( !palettes[theme.mixingPalette] ) {
							return true
						} else if(
							theme.mixingPalette &&
							!palettes[theme.mixingPalette].colors[variation.mixingColor]
						) {
							return true
						}
					}
					return false
				}
				if( state.themes[guid] ) {
					const theme = state.themes[guid]
					for( const key of required ) {
						switch( key ) {
							case 'guid':
								if( !theme.guid ) {
									errors.push( 1 )
								}
								break
							case 'themePalette':
								if( !theme.themePalette ) {
									errors.push( 2 )
								} else if( !palettes[theme.themePalette] ) {
									errors.push( 3 )
								} else if( Object.keys( palettes[theme.themePalette].colors ).length < 1 ) {
									errors.push( 4 )
								}
								break
							case 'mixingPalette':
								if( !theme.mixingPalette ) {
									errors.push( 5 )
								} else if( !palettes[theme.mixingPalette] ) {
									errors.push( 6 )
								} else if( Object.keys( palettes[theme.mixingPalette].colors ).length < 1 ) {
									errors.push( 7 )
								}
								break
							case 'name':
								if( !theme.name || theme.name.trim() === '' ) {
									errors.push( 8 )
								}
								break
							case 'namingScheme':
								if( !theme.namingScheme || theme.namingScheme.length < 1 ) {
									errors.push( 9 )
								}
								break
							case 'variationMapping':
								if( !theme.variationMapping || theme.variationMapping.length < 1 ) {
									errors.push( 10 )
								} else if( variationMixError( theme ) ) {
									errors.push( 11 )
								}
								break
						}
					}
				} else {
					errors.push( -1 )
				}
				return errors
			}
		},
		getColorList: ( state ) => {
			return ( guid: string ) => {
				const paletteStore = usePalettesStore()
				const palettes = paletteStore.palettes
				const theme = state.themes[guid]
				const mainPalette = palettes[theme.themePalette]
				const mainName = mainPalette.name
				const mainColors = mainPalette.colors
				const mixPalette = palettes[theme.mixingPalette]
				const mixName = mixPalette.name
				const mixColors = mixPalette.colors
				// Color list object, each level corresponds to a folder level
				return generateTheme( mainColors, mixColors, mainName, mixName, theme.name, theme.namingScheme, theme.variationMapping )
			}
		},
		getFigmaColorList: ( state ) => {
			return ( guid: string, useRatio = true ) => {
				const paletteStore = usePalettesStore()
				const palettes = paletteStore.palettes
				const theme = state.themes[guid]
				const mainPalette = palettes[theme.themePalette]
				const mainName = mainPalette.name
				const mainColors = mainPalette.colors
				const mixPalette = palettes[theme.mixingPalette]
				const mixName = mixPalette.name
				const mixColors = mixPalette.colors
				// Color list
				return generateFigmaTheme( mainColors, mixColors, mainName, mixName, theme.name, theme.namingScheme, theme.variationMapping, useRatio )
			}
		},
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
		generateThemeStyles( guid: string ) {
			const appStore = useAppStore()
			appStore.setOverlay( 'generate-theme', {
				title: 'Generate Theme Styles',
				buttons: {
					cancel: 'Close Preview',
					confirm: 'Add Color Styles to Figma',
				},
				guid: guid,
			} )
		},

	},
} )
