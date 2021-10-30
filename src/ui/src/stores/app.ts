import { defineStore } from 'pinia'
import { AppView } from '../types/AppView'
import ViewDashboard from '../views/ViewDashboard.vue'

export const useAppStore = defineStore( {
	id: 'app',
	state: (): AppView => ( {
		// Default app view is the dashboard
		workspaceComponent: ViewDashboard,
		header: 'Dashboard',
		viewData: {},
	} ),
	getters: {
		selectedItemGUID: ( state ) => {
			return state.viewData.guid || ''
		},
	},
	actions: {
		setWorkspaceComponent( component: AppView['workspaceComponent'] ) {
			this.workspaceComponent = component
		},
		setHeaderTitle( title: AppView['header'] ) {
			this.header = title
		},
		setViewData( data: AppView['viewData'] ) {
			this.viewData = data
		},
		setAppView( view: AppView ) {
			this.setWorkspaceComponent( view.workspaceComponent )
			this.setHeaderTitle( view.header )
			this.setViewData( view.viewData || {} )
		},
	},
} )