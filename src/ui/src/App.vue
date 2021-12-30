<template>
	<div class="root-wrapper type">
		<window-overlay />
		<window-resize />
		<div class="container">
			<app-header class="header" />
			<div class="main">
				<app-sidebar />
				<app-workspace />
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