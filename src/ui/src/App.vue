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
					:selected="selectedViewID"
					@setViewID="setViewID"
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
		const selectedViewID: Ref<string> = ref( '' )
		const appView = reactive( {
			// Default app view is the dashboard
			component: ViewDashboard,
			header: 'Dashboard',
			viewProps: {},
		} )

		function setViewID( e:any ) {
			selectedViewID.value = e.guid
		}

		return {
			palettes,
			themes,
			selectedViewID,
			setViewID,
			appView,
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
