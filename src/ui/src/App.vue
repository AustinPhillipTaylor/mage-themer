<template>
	<window-resize />
	<div class="container">
		<app-header class="header" />
		<div class="main">
			<app-sidebar
				class="sidebar"
				:themes="themes"
				:palettes="palettes"
				:selected="selectedView"
				@setView="setView"
			/>
			<app-workspace class="workspace" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppWorkspace from './components/AppWorkspace.vue'
import AppSidebar from './components/AppSidebar.vue'
import WindowResize from './components/WindowResize.vue'
import * as data from './dummy-data/data'
import { Palettes } from './types/palette'
import { Themes } from './types/theme'

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
		const selectedView = ref( '' )

		function setView( e:any ) {
			selectedView.value = e.guid
			console.log( e )
		}

		return {
			palettes,
			themes,
			selectedView,
			setView,
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
</style>
