<template>
	<div class="header" >
		<header-add-entry />
		<span class="title" > {{ header }} </span>
	</div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'
import HeaderAddEntry from './HeaderAddEntry.vue'

export default defineComponent( {
	components: {
		HeaderAddEntry,
	},
	setup() {

		const appStore = useAppStore()
		const { header } = storeToRefs( appStore )

		return { header }
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
		@include fonts.header
		height: 32px
		width: 100%
		display: inline-block
		line-height: 24px
		vertical-align: middle
		text-align: center
		padding: 4px 32px
		grid-column: header-title
</style>
