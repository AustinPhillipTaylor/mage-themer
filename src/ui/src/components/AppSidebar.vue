<template>
	<div class="sidebar" >
		Sidebar
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent( {
	props: {
		themes: {
			type: Object,
			required: true,
		},
		selected: {
			type: String,
			required: false,
		},
	},
	setup() {
		return { }
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts' as fonts

.sidebar
	@include fonts.font-sidebar
	overflow-y: auto
	border-right: 1px solid #E9EDF0
	padding: 12px
</style>
