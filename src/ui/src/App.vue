<template>
	<window-resize />
	<div class="container">
		<app-header
			class="header"
			:title="appView.header"
		/>
		<div class="main">
			<perfect-scrollbar>
				<app-sidebar
					class="sidebar"
					:themes="themes"
					:palettes="palettes"
					:selected="appView.viewData?.guid || ''"
					@setAppView="setAppView"
				/>
			</perfect-scrollbar>
			<perfect-scrollbar>
				<app-workspace
					class="workspace"
					:appView="appView"
				/>
			</perfect-scrollbar>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppWorkspace from './components/AppWorkspace.vue'
import AppSidebar from './components/AppSidebar.vue'
import WindowResize from './components/WindowResize.vue'
import ViewDashboard from './views/ViewDashboard.vue'
import * as data from './mock-data/data'
import { Palettes } from './types/palette'
import { Themes } from './types/theme'
import { AppView } from './types/AppView'

export default defineComponent( {
	components: {
		AppHeader,
		AppWorkspace,
		AppSidebar,
		WindowResize,
	},
	setup() {

		const palettes: Palettes = data.palettes
		const themes: Themes = data.themes
		const appView = reactive<AppView> ( {
			// Default app view is the dashboard
			component: ViewDashboard,
			header: 'Dashboard',
			viewData: {},
		} )

		/**
		 * Atomize each setting for appView in order to allow individual pieces
		 * to be easily updated without updating the entire view.
		 */
		function setWorkspaceComponent( component: AppView['component'] ) {
			appView.component = component
		}
		function setHeaderTitle( title: AppView['header'] ) {
			appView.header = title
		}
		function setViewProps( props: AppView['viewData'] ) {
			appView.viewData = props
		}

		function setAppView( view: AppView ) {
			setWorkspaceComponent( view.component )
			setHeaderTitle( view.header )
			setViewProps( view.viewData || {} )
		}

		return {
			palettes,
			themes,
			appView,
			setAppView,
		}
	},
} )
</script>

<style lang="sass" scoped>
.container
	font-family: Avenir, Helvetica, Arial, sans-serif
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	text-align: left
	color: #2c3e50
	margin: 0
	padding: 0
	height: 100vh
	width: 100vw
	display: grid
	grid-template-columns: 1fr
	grid-template-rows: 32px 1fr
	.main
		display: grid
		grid-template-columns: 220px 1fr
		overflow: hidden
		.ps // Perfect scrollbar wrapper
			height: calc( 100% - 1px ) // Subtract 1px because theres an odd overflow in Figma's iframe

</style>
