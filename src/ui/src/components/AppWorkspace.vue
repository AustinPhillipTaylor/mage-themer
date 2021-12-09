<template>
	<div class="workspace">
		<component
			:is="workspaceComponent"
			:key="viewKey"
			:guid="guid"
		/>
	</div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'

export default defineComponent( {
	setup() {
		const appStore = useAppStore()
		const { workspaceComponent, guid, viewKey } = storeToRefs( appStore )

		return {
			workspaceComponent,
			viewKey,
			guid,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts' as fonts

.workspace
	@include fonts.workspace
	overflow-y: visible
	padding: 0 24px 64px 24px
</style>
