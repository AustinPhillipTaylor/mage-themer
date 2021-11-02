<template>
	<div class="sidebar" >
		<div class="section-label"> Themes </div>
		<div
			v-if="Object.keys(themes).length < 1"
			class="no-items-notice"
		>
			<span class="no-items-title" >No themes found</span>
			<span class="no-items-guide" >Start creating a new theme using the add (+) icon in the top left.</span>
		</div>
		<ul
			v-else
			class="themes"
		>
			<li
				v-for="(theme, guid) in themes"
				:key="guid"
				:class="['sidebar-button', { 'current': selectedItemGUID === guid as string }]"
				@click="setAppView( {
					workspaceComponent: ViewTheme,
					header: `Theme - ${theme.name}`,
					viewData: theme,
				})"
			>
				{{ theme.name }}
			</li>
		</ul>
		<div class="section-label"> Palettes </div>
		<div
			v-if="Object.keys(palettes).length < 1"
			class="no-items-notice"
		>
			<span class="no-items-title" >No palettes found</span>
			<span class="no-items-guide" >Start creating a new palette using the add (+) icon in the top left.</span>
		</div>
		<ul
			v-else
			class="palettes"
		>
			<li
				v-for="(palette, guid) in palettes"
				:key="guid"
				:class="['sidebar-button', { 'current': selectedItemGUID === guid as string }]"
				@click="setAppView( {
					workspaceComponent: ViewPalette,
					header: `Palette - ${palette.name}`,
					viewData: palette,
				})"
			>
				{{ palette.name }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import ViewPalette from '../views/ViewPalette.vue'
import ViewTheme from '../views/ViewTheme.vue'
import { useAppStore } from '../stores/app'
import { usePalettesStore } from '../stores/palettes'
import { useThemesStore } from '../stores/themes'
import { storeToRefs } from 'pinia'

export default defineComponent( {
	setup() {
		const appStore = useAppStore()
		const { setAppView } = appStore
		const { selectedItemGUID } = storeToRefs( appStore )

		const paletteStore = usePalettesStore()
		const { palettes } = storeToRefs( paletteStore )

		const themeStore = useThemesStore()
		const { themes } = storeToRefs( themeStore )

		return {
			setAppView,
			selectedItemGUID,
			palettes,
			themes,
			ViewPalette,
			ViewTheme,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts'
@use '../styles/mixins/colors'

.sidebar
	@include fonts.sidebar
	overflow-y: auto
	padding: 0
	background: colors.$sidebar-background
	color: colors.$sidebar-link-text
	min-height: calc(100% - 1px) // Subtract 1px because theres an odd overflow in Figma's iframe
	.section-label
		@include fonts.sidebar-label
		width: auto
		height: auto
		color: colors.$sidebar-label-text
		border-bottom: 1px solid colors.$sidebar-label-border
		margin: 0 14px 8px 14px
		padding: 24px 2px 4px 2px
		display: block
		&:nth-child(1)
			padding-top: 16px
	.no-items-notice
		padding: 4px 16px
		text-align: center
		.no-items-title
			@include fonts.sidebar-empty-title
			display: block
			padding: 0 0 2px 0
		.no-items-guide
			@include fonts.sidebar-empty-guide
			display: block
			color: colors.$sidebar-label-text
	ul
		li
			&.sidebar-button
				text-align: left
				padding: 8px 16px 8px 12px
				background: transparent
				width: auto
				display: block
				margin: 0
				border: none
				outline: none
				border-left: 4px solid colors.$sidebar-link-border
				&.current
					color: colors.$sidebar-link-text-hover
					cursor: pointer
					background: colors.$sidebar-link-hover-bg
					border-left: 4px solid colors.$sidebar-link-border-current
					&:hover
						border-left: 4px solid colors.$sidebar-link-border-current
				&:hover,
				&:active
					cursor: pointer
					color: colors.$sidebar-link-text-active
					background: colors.$sidebar-link-active-bg
					border-left: 4px solid colors.$sidebar-link-border-hover
</style>
