<template>
	<div class="header" >
		<span class="title" > Header </span>
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

.header
	display: grid
	grid-template-columns: 32px 32px [header-title] 1fr 32px 32px
	border-bottom: 1px solid #E9EDF0
	.title
		@include fonts.font-header
		height: 32px
		width: 100%
		display: inline-block
		line-height: 24px
		vertical-align: middle
		text-align: center
		padding: 4px 32px
		grid-column: header-title
</style>
