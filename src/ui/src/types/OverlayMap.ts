import { Component } from 'vue'

interface OverlayMapItem {
	/** Component to display for overlay type */
	overlayComponent: Component
}

export interface OverlayMap {
	[name: string]: OverlayMapItem
}