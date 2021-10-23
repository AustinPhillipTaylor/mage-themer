<template>
	<div class="workspace">
		Workspace
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent( {
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
