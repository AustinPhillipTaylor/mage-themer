import { defineStore } from 'pinia'
import { AppView } from '../types/AppView'
import { viewTypes } from '../data/viewMap'

export const useAppStore = defineStore( {
	id: 'app',
	state: (): AppView => ( {
		workspaceComponent: {},
		header: '',
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
		setAppView( view: string, title?: string, guid?: string ) {
			const viewDetails = viewTypes[view]
			if( viewDetails ) {
				this.setWorkspaceComponent( viewDetails.workspaceComponent )
				this.setHeaderTitle( viewDetails.header( title ) || 'No Title' )
				this.setViewData( viewDetails.viewData ? viewDetails.viewData( guid as string ) : {} )
			}
		},
	},
} )