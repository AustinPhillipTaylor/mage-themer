<template>
	<div class="header" >
		<add-entry />
		<import-export />
		<span class="title" > {{ header }} </span>
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
@use '../styles/mixins/fonts'
@use '../styles/mixins/colors'

.header
	display: grid
	grid-template-columns: 32px 150px [header-title] 1fr 150px 32px
	grid-template-rows: 32px
	grid-gap: 8px
	padding: 0 8px
	justify-items: center
	align-items: center
	border-bottom: 1px solid colors.$frame-border
	.title
		@include fonts.header
		width: 100%
		display: inline-block
		line-height: 24px
		vertical-align: middle
		text-align: center
		grid-column: header-title
		text-overflow: ellipsis
		overflow: hidden
		white-space: nowrap
</style>
