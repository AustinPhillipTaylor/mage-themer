import { defineStore } from 'pinia'
import { AppView } from '../types/AppView'
import { viewTypes } from '../data/viewMap'
import { overlayTypes } from '../data/overlayMap'
import { markRaw } from 'vue'

export const useAppStore = defineStore( {
	id: 'app',
	state: (): AppView => ( {
		workspaceComponent: {},
		header: '',
		guid: '',
		viewType: '',
		overlay: {
			active: false,
			overlayType: '',
			props: {},
		},
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
		setOverlay( type = '', props: AppView['overlay']['props'] = {} ) {
			if( overlayTypes[type] ) {
				this.overlay.overlayType = type
				this.overlay.props = props
				this.overlay.active = true
			} else {
				this.unsetOverlay()
			}
		},
		unsetOverlay() {
			this.overlay.active = false
			this.overlay.overlayType = ''
			this.overlay.props = {}
		},
	},
} )