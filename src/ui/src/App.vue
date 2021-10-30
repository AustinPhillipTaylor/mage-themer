<template>
	<window-resize />
	<div class="container">
		<app-header class="header" />
		<div class="main">
			<perfect-scrollbar>
				<app-sidebar class="sidebar" />
			</perfect-scrollbar>
			<perfect-scrollbar>
				<app-workspace class="workspace" />
			</perfect-scrollbar>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppWorkspace from './components/AppWorkspace.vue'
import AppSidebar from './components/AppSidebar.vue'
import WindowResize from './components/WindowResize.vue'

export default defineComponent( {
	components: {
		AppHeader,
		AppWorkspace,
		AppSidebar,
		WindowResize,
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
