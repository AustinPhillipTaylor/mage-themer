<template>
	<div
		:class="[
			'theme-overview',
			{
				'errors': hasErrors
			}
		]"
	>
		<div class="first-row">
			<div
				class="details"
			>
				<div class="theme-title" > {{ theme.name || 'Untitled Theme' }} </div>
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
				<div
					:class="[
						'action-button',
						{
							'disabled': hasErrors
						}
					]"
					@click="!(hasErrors) && previewStyles()"
				>Preview Styles</div>
				<div
					:class="[
						'action-button',
						{
							'disabled': hasErrors
						}
					]"
					@click="!(hasErrors) && renderStyles()"
				>Add Styles to Figma</div>
				<!-- <div class="action-button">Add Swatches to Canvas</div> -->
			</div>
		</div>
		<notice
			level="danger"
			class="error-notice"
			v-if="hasErrors"
		>
			There are errors with this theme which interfere with style generation.
			<ul>
				<li
					v-for="(item, index) in themeErrors"
					:key="index"
				>
					<template v-if="item === 1"> – Missing GUID (Likely an issue with an import file) </template>
					<template v-if="item === 2"> – Theme palette not set </template>
					<template v-if="item === 3"> – Theme palette does not exist </template>
					<template v-if="item === 4"> – Theme palette has no colors defined </template>
					<template v-if="item === 5"> – Mixing palette not set </template>
					<template v-if="item === 6"> – Mixing palette does not exist </template>
					<template v-if="item === 7"> – Mixing palette has no colors defined </template>
					<template v-if="item === 8"> – Name must be set </template>
					<template v-if="item === 9"> – Naming scheme must be set </template>
					<template v-if="item === 10"> – Theme must define color variations </template>
				</li>
			</ul>
		</notice>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { usePalettesStore } from '../stores/palettes'
import { useThemesStore } from '../stores/themes'
import { Theme } from '../types/Theme'
import { hexStringFromRGB } from '../utils/hexStringFromRGB'
import Notice from './general/Notice.vue'

export default defineComponent( {
	components: {
		Notice,
	},
	props: {
		theme:{
			type: Object as PropType<Theme>,
			required: true,
		},
		guid:{
			type: String,
			required: true,
		},
	},
	setup( props ) {

		const themeStore = useThemesStore()
		const themes = computed( () => themeStore.themes )
		const themesLength = computed( () => Object.keys( themes.value ).length )
		const themeErrors = themeStore.themeErrors( props.guid )

		const paletteStore = usePalettesStore()
		const palettes = paletteStore.palettes

		const hasErrors = computed( () => {
			return themeErrors.length > 0
		} )

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

		function previewStyles() {
			console.log( 'preview styles' )
		}

		function renderStyles() {
			console.log( 'render styles' )
		}

		return {
			themes,
			colorList,
			colorCount,
			paletteExists,
			hexStringFromRGB,
			themesLength,
			themeErrors,
			hasErrors,
			previewStyles,
			renderStyles,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/colors'
@use '../styles/mixins/fonts'

.theme-overview
	display: grid
	grid-template-rows: auto auto
	width: 100%
	height: auto
	min-height: 32px
	border-radius: 8px
	margin: 16px 0
	border: 2px solid colors.$gray-20
	padding: 16px 24px
	.error-notice
		margin: 16px 0 0 0
		ul
			li
				list-style-type: none
	.first-row
		display: grid
		grid-template-columns: [details] minmax(0, auto) [actions] min-content
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
		&.errors
			border: 2px solid colors.$danger
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
	&.disabled
		background: colors.$button-disabled
		color: colors.$button-disabled-text
		cursor: not-allowed
		&:hover,
		&:active
			background: colors.$button-disabled
			color: colors.$button-disabled-text
</style>
