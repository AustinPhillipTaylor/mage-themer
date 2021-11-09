import { ViewMap } from '../types/ViewMap'
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
		header( title: string ) {
			return `Theme - ${ title }`
		},
	},
	'palette': {
		workspaceComponent: ViewPalette,
		header( title: string ) {
			return `Palette - ${ title }`
		},
	},
}