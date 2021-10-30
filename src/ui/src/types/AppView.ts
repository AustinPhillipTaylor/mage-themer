import { Component } from 'vue'

export interface AppView {
	/** Component to display in workspace */
	workspaceComponent: Component
	/** Title to display in header */
	header: string
	/** Data used to populate view */
	viewData: {
		guid?: string
		[key: string] : any
	}
}