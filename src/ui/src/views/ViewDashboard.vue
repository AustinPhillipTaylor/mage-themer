
<template>
	<div class="view-dashboard">
		<h1>Themes</h1>
		<template
			v-for="(theme, guid) in themes"
			:key="guid"
		>
			<div class="theme-overview">
				<div class="details">
					<div class="theme-title"> {{ theme.name || 'Untitled Theme' }} </div>
					<div class="theme-subtitle">
						{{
							'Generates ' +
								(colorCount(theme.themePalette) * theme.variationMapping.length) +
								' colors'
						}}
					</div>
					<div class="palette-colors">
						<template v-if="paletteExists(theme.themePalette)">
							<template
								v-for="(color, guid) in colorList(theme.themePalette)"
								:key="guid"
							>
								<div
									:style="{
										background: hexStringFromRGB( color.rgb ),
									}"
									class="color-preview"
								></div>
							</template>
						</template>
						<template v-else>
							Main palette not set.
						</template>
					</div>
					<div class="mixing-colors">
						<template v-if="paletteExists(theme.mixingPalette)">
							<template
								v-for="(color, guid) in colorList(theme.mixingPalette)"
								:key="guid"
							>
								<div
									:style="{
										background: hexStringFromRGB( color.rgb ),
									}"
									class="color-preview"
								></div>
							</template>
						</template>
						<template v-else>
							Mixing palette not set.
						</template>
					</div>
				</div>
				<div class="actions">
					<div class="action-button">Preview Styles</div>
					<div class="action-button">Add Styles to Figma</div>
					<div class="action-button">Add Swatches to Canvas</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePalettesStore } from '../stores/palettes'
import { useThemesStore } from '../stores/themes'
import { hexStringFromRGB } from '../utils/hexStringFromRGB'

export default defineComponent( {
	setup() {
		const themeStore = useThemesStore()
		const themes = themeStore.themes

		const paletteStore = usePalettesStore()
		const palettes = paletteStore.palettes

		function colorCount( guid: string ) {
			if( paletteExists( guid ) ) {
				return Object.keys( palettes[guid].colors ).length
			}
			return 0
		}

		function colorList( guid: string ) {
			if( paletteExists( guid ) ) {
				return palettes[guid].colors
			}
			return {}
		}

		function paletteExists( guid: string ) {
			if( palettes[guid] ) {
				return true
			}
			return false
		}

		return {
			themes,
			colorList,
			colorCount,
			paletteExists,
			hexStringFromRGB,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/colors'
@use '../styles/mixins/fonts'

.view-dashboard
	display: block
	width: 100%
	max-width: 800px
	min-width: 450px
	h1
		margin: 24px 0
		padding: 0 0 8px 0
		border-bottom: 1px solid colors.$h1-border
	.theme-overview
		display: grid
		grid-template-columns: [details] minmax(0, auto) [actions] min-content
		width: 100%
		height: auto
		min-height: 32px
		border-radius: 8px
		margin: 16px 0
		border: 2px solid colors.$gray-20
		padding: 16px 24px
		.details
			grid-column: details
			overflow: hidden
			.theme-title
				@include fonts.overview-title
			.theme-subtitle
				@include fonts.overview-subtitle
				color: colors.$secondary-text
		.actions
			grid-column: actions
			grid-template-rows: min-content min-content min-content
			max-height: 200px
			grid-gap: 8px
			display: grid
			align-items: center
			.action-button
				@include fonts.secondary-button
				display: block
				width: auto
				background: colors.$secondary-button-bg
				color: colors.$secondary-button-text
				border: 1px solid colors.$secondary-button-border
				height: auto
				white-space: nowrap
				padding: 8px 16px
				border-radius: 4px
				text-align: center
				cursor: pointer
				&:hover
					background: colors.$secondary-button-hover-bg
					color: colors.$secondary-button-hover-text
				&:active
					background: colors.$secondary-button-active-bg
		.palette-colors,
		.mixing-colors
			.color-preview
				display: inline-block
				height: 17px
				width: 17px
				border-radius: 50%
				margin: 4px 8px 4px 0
				vertical-align: middle
				border: 1px solid colors.$input-select-preview-swatch-border
</style>
