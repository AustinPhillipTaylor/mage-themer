import { Component } from 'vue'

export interface AppView {
	component: Component
	header: string
	viewProps?: {
		[prop: string] : any
	}
}