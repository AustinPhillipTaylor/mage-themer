<template>
	<div
		class="add-entry"
		@click="toggleEntryList"
	>
		<div class="header-icon">
			<span class="material-icons-outlined">
				add
			</span>
			<div
				:class="['entry-options', { 'adding-entry': addingEntry }]"
			>
				<span @click="addTheme" > Add new theme </span>
				<span @click="addPalette" > Add new palette </span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePalettesStore } from '../stores/palettes'
import { useThemesStore } from '../stores/themes'

export default defineComponent( {
	setup() {
		const addingEntry = ref( false )
		const themeStore = useThemesStore()
		const paletteStore = usePalettesStore()
		const { addTheme } = themeStore
		const { addPalette } = paletteStore


		function toggleEntryList( e: Event ) {
			e.stopPropagation()
			if( addingEntry.value ) {
				addingEntry.value = false
				window.removeEventListener( 'click', toggleEntryList )
			} else {
				addingEntry.value = true
				window.addEventListener( 'click', toggleEntryList )
			}
		}

		return {
			addingEntry,
			toggleEntryList,
			addTheme,
			addPalette,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts' as fonts
@use '../styles/mixins/colors' as colors

.add-entry
	width: 100%
	height: 100%
	padding: 4px
	.header-icon
		position: relative
		align-self: center
		justify-self: center
		padding: 2px
		font-size: 20px
		background: transparent
		border-radius: 4px
		z-index: 999999
		.material-icons-outlined
			font-size: 20px
		&:hover
			background: #E9EDF0
			cursor: pointer
		.entry-options
			position: absolute
			top: 100%
			left: 0
			background: colors.$main-dark
			color: white
			padding: 4px
			border-radius: 0 4px 4px 4px
			display: none
			&:before
				content: ""
				display: block
				width: 0
				height: 0
				border: 8px solid transparent
				border-left: 8px solid #3d404c
				position: absolute
				top: -8px
				left: 0px
			&.adding-entry
				display: block
			span
				@include fonts.header-add-options
				white-space: nowrap
				padding: 4px 8px
				display: block
				border-radius: 2px
				color: colors.$main-light
				&:hover
					background: rgba(colors.$main-light, .1)
					cursor: pointer
</style>
