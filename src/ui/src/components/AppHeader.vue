<template>
	<div class="header" >
		<div class="start-buttons">
			<add-entry />
			<import-export />
		</div>
		<span class="title type--medium" > {{ header }} </span>
		<div class="end-buttons">
		</div>
	</div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'
import AddEntry from './header/AddEntry.vue'
import ImportExport from './header/ImportExport.vue'

export default defineComponent( {
	components: {
		AddEntry,
		ImportExport,
	},
	setup() {

		const appStore = useAppStore()
		const { header } = storeToRefs( appStore )

		return { header }
	},
} )
</script>

<style lang="sass" scoped>
.header
	display: grid
	grid-template-columns: [start-buttons] 1fr [header-title] auto [end-buttons] 1fr
	grid-template-rows: var(--size-large)
	height: var(--size-large)
	grid-gap: 0
	padding: 0
	justify-items: center
	align-items: center
	box-sizing: content-box
	border-bottom: 1px solid var(--silver)
	.start-buttons
		grid-column: start-buttons
		flex-flow: row nowrap
		height: var(--size-large)
		width: 100%
		display: flex
		justify-content: flex-start
		align-items: center
	.end-buttons
		grid-column: end-buttons
		flex-flow: row nowrap
		height: var(--size-large)
		width: 100%
		display: flex
		justify-content: flex-end
		align-items: center
	.title
		width: 100%
		text-align: center
		grid-column: header-title
		text-overflow: ellipsis
		overflow: hidden
		white-space: nowrap
</style>
