import { Component } from 'vue'

export interface AppView {
	/** Component to display in workspace */
	workspaceComponent: Component
	/** Title to display in header */
	header: string
	/**
	 * GUID of view, used as key when instantiating component.
	 * May be empty string for components that won't be repeated.
	 */
	guid: string
	/** String coressponding to key in viewMap */
	viewType: string
	/** Key that will be applied to workspace component. Used to force component update. */
	viewKey: number
	/** Overlay/modal definition */
	overlay: {
		active: boolean
		/** String coressponding to key in overlayMap */
		overlayType: string
		props: {
			[key: string]: any
		}
	}
}