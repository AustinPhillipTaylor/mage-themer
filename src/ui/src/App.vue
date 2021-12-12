<template>
	<div class="root-wrapper type">
		<window-overlay />
		<window-resize />
		<div class="container">
			<app-header class="header" />
			<div class="main">
				<perfect-scrollbar class="sidebar">
					<app-sidebar />
				</perfect-scrollbar>
				<perfect-scrollbar class="workspace">
					<app-workspace />
				</perfect-scrollbar>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppWorkspace from './components/AppWorkspace.vue'
import AppSidebar from './components/AppSidebar.vue'
import WindowResize from './components/WindowResize.vue'
import WindowOverlay from './components/overlay/WindowOverlay.vue'
import { useAppStore } from './stores/app'

export default defineComponent( {
	components: {
		AppHeader,
		AppWorkspace,
		AppSidebar,
		WindowResize,
		WindowOverlay,
	},
	setup() {
		const appStore = useAppStore()
		// Set default view
		appStore.setAppView( 'dashboard' )
		return {}
	},
} )
</script>

<style lang="sass" scoped>
.root-wrapper
	.container
		margin: 0
		padding: 0
		height: 100vh
		width: 100vw
		display: grid
		grid-template-columns: 1fr
		grid-template-rows: [header] calc(var(--size-large) + 1px) [main] 1fr
		.header
			grid-row: header
		.main
			display: grid
			grid-row: main
			grid-template-columns: [sidebar] 240px [workspace] 1fr
			overflow: hidden
			.sidebar
				grid-column: sidebar
			.workspace
				grid-column: workspace

</style>
