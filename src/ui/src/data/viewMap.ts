import { ViewMap } from '../types/ViewMap'
import ViewPalette from '../views/ViewPalette.vue'
import ViewTheme from '../views/ViewTheme.vue'
import ViewDashboard from '../views/ViewDashboard.vue'
import ViewHelp from '../views/ViewHelp.vue'

export const viewTypes: ViewMap = {
	'dashboard': {
		workspaceComponent: ViewDashboard,
		header() {
			return 'Dashboard'
		},
	},
	'help': {
		workspaceComponent: ViewHelp,
		header() {
			return 'Help / Information'
		},
	},
	'theme': {
		workspaceComponent: ViewTheme,
		header( title: string ) {
			return `Theme - ${ title || 'Untitled Theme' }`
		},
	},
	'palette': {
		workspaceComponent: ViewPalette,
		header( title: string ) {
			return `Palette - ${ title || 'Untitled Palette' }`
		},
	},
}