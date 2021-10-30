<template>
	<div class="workspace">
		<component
			:is="workspaceComponent"
			:data="viewData"
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
		const { workspaceComponent, viewData } = storeToRefs( appStore )

		return {
			workspaceComponent,
			viewData,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts' as fonts

.workspace
	@include fonts.font-workspace
	overflow-y: auto
	padding: 12px
</style>
