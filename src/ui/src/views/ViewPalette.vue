
<template>
	<div class="view-palette">
		<div class="palette-name">
			<text-input
				v-model="name"
				id="paletteName"
				label="Palette Name"
				placeholder="Palette Name"
			/>
		</div>
		<div class="palette-colors">
			<div
				v-for="color in colors"
				:key="color.guid"
				class="color-definition"
			>
				<div
					class="color-swatch"
					:style="{
						background: hexStringFromRGB(color.rgb)
					}"
				>
					<div class="swatch-hover-overlay">
						<div
							class="material-icons-outlined edit"
							@click="setColorPicker( ($event.target as HTMLElement), color )"
						>
							palette
						</div>
						<div
							class="material-icons-outlined delete"
							@click="() => deleteSwatch( guid, color.guid )"
						>
							delete
						</div>
					</div>
					<div
						class="color-info"
						:style="{
							//@ts-ignore
							'--red': color.rgb.r,
							'--green': color.rgb.g,
							'--blue': color.rgb.b,
						}"
					>
						{{ hexStringFromRGB(color.rgb) }}
					</div>
				</div>
				<text-input
					v-model="color.name"
					:id="color.guid"
					class="color-name-input"
					placeholder="Color Name"
				/>
			</div>
			<div
				class="add-color"
				@click="() => addPaletteColor(guid)"
			>
				<div class="material-icons-outlined">
					add
				</div>
				<div>Add Color</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch, Ref, computed } from 'vue'
import TextInput from '../components/form/TextInput.vue'
import { usePalettesStore } from '../stores/palettes'
import { useAppStore } from '../stores/app'
import tinyColor from 'tinycolor2'
import { PaletteColor } from '../types/palette'
import { ColorPickerModel } from '../types/ColorPicker'
import { hexStringFromRGB } from '../utils/hexStringFromRGB'

export default defineComponent( {
	components: {
		TextInput,
	},
	props: {
		guid: {
			type: String,
			required: true,
		},
	},
	setup( props ) {
		const paletteStore = usePalettesStore()

		const curPalette = computed( () => paletteStore.palettes[props.guid] )

		const name = computed( {
			get: () => curPalette.value.name,
			set: ( val ) => {
				curPalette.value.name = val
			},
		} )

		const colors = computed( {
			get: () => curPalette.value.colors,
			set: ( val ) => {
				curPalette.value.colors = val
			},
		} )

		const { addPaletteColor, deleteSwatch } = paletteStore

		const appStore = useAppStore()

		const setColorPicker = ( element: HTMLElement, colorInfo: PaletteColor ) => {
			appStore.setOverlay( 'color-picker', {
				initialColor: colorInfo.rgb,
				clickedComponent: element.parentElement?.parentElement,
				callback: ( model: ColorPickerModel ) => {
					colorInfo.rgb = tinyColor( model.rgba ).toRgb()
				},
			} )
		}

		watch(
			() => name.value,
			( name ) => {
				appStore.setHeaderTitle( name )
			}
		)

		return {
			name,
			colors,
			deleteSwatch,
			addPaletteColor,
			hexStringFromRGB,
			setColorPicker,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts'
@use '../styles/mixins/colors'

.view-palette
	display: block
	width: 100%
	max-width: 800px
	.palette-colors
		display: grid
		grid-template-columns: repeat(auto-fill, 130px)
		grid-gap: 16px
		position: relative
		.color-definition,
		.add-color
			display: grid
			width: 130px
			height: 150px
			border-radius: 4px
		.add-color
			@include fonts.secondary-button
			grid-template-columns: 1fr
			grid-template-rows: min-content min-content
			align-items: center
			align-content: center
			grid-gap: 8px
			text-align: center
			background: colors.$secondary-button-bg
			cursor: pointer
			color: colors.$secondary-button-text
			border: 1px solid colors.$secondary-button-border
			&:hover
				background: colors.$secondary-button-hover-bg
				div
					color: colors.$secondary-button-hover-text
			&:active
				background: colors.$secondary-button-active-bg
		.color-definition
			grid-template-rows: 1fr min-content
			grid-gap: 8px
			.color-name-input
				margin: 0
			.color-swatch
				position: relative
				width: 100%
				height: 100%
				background: #fff
				border-radius: 4px
				border: 2px solid colors.$palette-color-border
				cursor: pointer
				.color-info
					@include fonts.palette-color-info
					--threshold: 0.5
					--r: calc(var(--red) * 0.299)
					--g: calc(var(--green) * 0.587)
					--b: calc(var(--blue) * 0.114)
					--sum: calc(var(--r) + var(--g) + var(--b))
					--perceived-lightness: calc(var(--sum) / 255)
					color: hsl(0, 0%, calc((var(--perceived-lightness) - var(--threshold)) * -10000000%))
					padding: 8px
				.swatch-hover-overlay
					display: none
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					background: colors.$palette-color-overlay-bg
					grid-template-columns: min-content min-content
					grid-gap: 4px
					justify-content: center
					align-content: center
					z-index: 100
					.material-icons-outlined
						@include fonts.material-icons-large
						padding: 8px
						color: colors.$palette-color-overlay-text
						background: transparent
						border-radius: 50%
						&.edit
							&:hover
								background: colors.$palette-color-overlay-edit-hover
						&.delete
							&:hover
								background: colors.$palette-color-overlay-delete-hover
				&:hover
					.swatch-hover-overlay
						display: grid
</style>
