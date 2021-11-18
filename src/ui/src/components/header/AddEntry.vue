<template>
	<div
		class="add-entry"
		tabindex="0"
		@blur="isOpen = false"
		@click="isOpen = !isOpen"
	>
		<div class="add-entry-icon">
			<span class="material-icons-outlined">
				add
			</span>
			<div
				:class="['options', { 'open': isOpen }]"
			>
				<span @click="addTheme" > Add new theme </span>
				<span @click="addPalette" > Add new palette </span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePalettesStore } from '../../stores/palettes'
import { useThemesStore } from '../../stores/themes'

export default defineComponent( {
	setup() {
		const isOpen = ref( false )
		const themeStore = useThemesStore()
		const paletteStore = usePalettesStore()
		const { addTheme } = themeStore
		const { addPalette } = paletteStore

		return {
			isOpen,
			addTheme,
			addPalette,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.add-entry
	user-select: none
	padding: 4px // Fill out space in button area to increase target click area
	.add-entry-icon
		@include fonts.material-icons
		position: relative
		padding: 2px
		font-size: 0 // Fix issues with height caused by spaces
		background: colors.$action-icon-bg
		border-radius: 4px
		z-index: 999
		.material-icons-outlined
			@include fonts.material-icons
		&:hover
			background: colors.$action-icon-hover-bg
			cursor: pointer
		.options
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
			&.open
				display: block
			span
				@include fonts.header-options
				white-space: nowrap
				padding: 4px 8px
				display: block
				border-radius: 2px
				color: colors.$main-light
				&:hover
					background: rgba(colors.$main-light, .1)
					cursor: pointer
</style>
