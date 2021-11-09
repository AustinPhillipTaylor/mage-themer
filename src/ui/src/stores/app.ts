import { defineStore } from 'pinia'
import { AppView } from '../types/AppView'
import { viewTypes } from '../data/viewMap'
import { markRaw } from 'vue'

export const useAppStore = defineStore( {
	id: 'app',
	state: (): AppView => ( {
		workspaceComponent: {},
		header: '',
		guid: '',
		viewType: '',
	} ),
	getters: { },
	actions: {
		setWorkspaceComponent() {
			const component = viewTypes[this.viewType].workspaceComponent
			this.workspaceComponent = markRaw( component )
		},
		setHeaderTitle( title: AppView['header'] ) {
			const formattedTitle = viewTypes[this.viewType].header( title ) || 'No Title'
			this.header = formattedTitle
		},
		setGUID( guid: AppView['guid'] ) {
			this.guid = guid
		},
		setAppView( type = '', title = '', guid = '' ) {
			if( viewTypes[type] ) {
				this.viewType = type
				this.setWorkspaceComponent()
				this.setHeaderTitle( title )
				this.setGUID( guid )
			} else {
				console.error( `View type of '${ type }' does not exist in View Map.` )
			}
		},
	},
} )