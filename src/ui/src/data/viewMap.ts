import { ViewMap } from '../types/ViewMap'
import { useThemesStore } from '../stores/themes'
import { usePalettesStore } from '../stores/palettes'
import ViewPalette from '../views/ViewPalette.vue'
import ViewTheme from '../views/ViewTheme.vue'
import ViewDashboard from '../views/ViewDashboard.vue'

export const viewTypes: ViewMap = {
	'dashboard': {
		workspaceComponent: ViewDashboard,
		header() {
			return 'Dashboard'
		},
	},
	'theme': {
		workspaceComponent: ViewTheme,
		header( title ) {
			return `Theme - ${ title }`
		},
		viewData( guid: string ) {
			const themeStore = useThemesStore()
			return themeStore.themes[guid] || {}
		},
	},
	'palette': {
		workspaceComponent: ViewPalette,
		header( title ) {
			return `Palette - ${ title }`
		},
		viewData( guid: string ) {
			const paletteStore = usePalettesStore()
			return paletteStore.palettes[guid] || {}
		},
	},
}