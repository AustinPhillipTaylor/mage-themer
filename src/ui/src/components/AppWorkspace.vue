<template>
	<div class="workspace">
		<component
			:is="appView.component"
			:="appView.viewProps"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { AppView } from '../types/AppView'

export default defineComponent( {
	props: {
		appView: {
			type: Object as PropType<AppView>,
			required: true,
		},
	},
	setup() {
		return { }
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
