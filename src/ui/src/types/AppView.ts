import { Component } from 'vue'

export interface AppView {
	component: Component
	header: string
	viewData?: {
		[key: string] : any
	}
}