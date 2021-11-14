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
				this.unsetOverlay()
			} else {
				console.error( `View type of '${ type }' does not exist in View Map.` )
			}
		},
		async setOverlay( type = '', props: AppView['overlay']['props'] = {} ) {
			if( overlayTypes[type] ) {
				// If we tried to set the overlay while another was active
				if( this.overlay.active ) {
					await this.unsetOverlay()
				}
				this.overlay.overlayType = type
				this.overlay.props = props
				this.overlay.active = true
			} else {
				this.unsetOverlay()
			}
		},
		/**
		 * I know... I know... 'Why is this async' you ask. Something with how Pinia and/or
		 * Vue work is making unsetOverlay() take a couple miliseconds to reset eveything.
		 * As a result, in setOverlay(), I couldn't unset and then immediately set the overlay
		 * again. Trying to set the props while they were being unset was causing them to stop
		 * setting all together. Don't really know why that is, literally unset was like
		 * "If I can't do my thing, then nobody can". So TLDR, this is async to force setOverlay
		 * to wait for unsetOverlay to finish, otherwise unset throws a temper tantrum and I'm
		 * not having any of it. I will turn this car around and _nobody_ gets Ice Cream!
		 */
		async unsetOverlay() {
			this.overlay.active = false
			this.overlay.overlayType = ''
			this.overlay.props = {}
			return true
		},
	},
} )