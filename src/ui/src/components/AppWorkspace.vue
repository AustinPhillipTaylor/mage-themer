<template>
	<div class="workspace" >
		<perfect-scrollbar
			:key="guid || viewKey"
		>
			<component
				:is="workspaceComponent"
				:key="viewKey"
				:guid="guid"
			/>
		</perfect-scrollbar>
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