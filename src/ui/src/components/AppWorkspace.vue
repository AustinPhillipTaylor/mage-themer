<template>
	<div class="workspace">
		<keep-alive>
			<component
				:is="workspaceComponent"
				:key="guid"
				:guid="guid"
			/>
		</keep-alive>
	</div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'

export default defineComponent( {
	setup() {
		const appStore = useAppStore()
		const { workspaceComponent, guid } = storeToRefs( appStore )

		return {
			workspaceComponent,
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
	padding: 0 24px
</style>
