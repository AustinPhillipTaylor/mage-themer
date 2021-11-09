import { Component } from 'vue'

interface ViewMapItem {
	/** Component to display for view type */
	workspaceComponent: Component
	/** Function that recieves a title string and outputs a formatted header title */
	header( title?: string ): string
}

export interface ViewMap {
	[name: string]: ViewMapItem
}