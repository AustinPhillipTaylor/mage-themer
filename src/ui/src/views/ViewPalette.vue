
<template>
	<div class="view-wrapper view-palette">
		<div class="palette-name">
			<text-input
				v-model="name"
				id="paletteName"
				label="Palette Name"
				placeholder="Palette Name"
			/>
		</div>
		<div class="section-title">
			Swatches
		</div>
		<div
			class="swatch-labels"
		>
			<div class="section-title">
				<div class="top-row-label">Color</div>
			</div>
			<div class="section-title">
				<div class="top-row-label">Name</div>
			</div>
			<div class="top-row-label">
				<with-simple-tooltip :horizontalMargin="8">
					<template #contents>
						<icon-button
							type="plus"
							@click="() => addPaletteColor(guid)"
						></icon-button>
					</template>
					<template #tooltip>
						Add new swatch
					</template>
				</with-simple-tooltip>
			</div>
		</div>
		<div class="palette-colors">
			<template
				v-for="color in colors"
				:key="color.guid"
			>
				<color-definition
					v-model:name="color.name"
					@click:color="setColorPicker( ($event.target as HTMLElement), color )"
					:id="color.guid"
					:rgb="color.rgb"
				/>
				<with-simple-tooltip :horizontalMargin="8">
					<template #contents>
						<icon-button
							class="delete-item"
							type="minus"
							@click="() => deleteSwatch( guid, color.guid )"
						></icon-button>
					</template>
					<template #tooltip>
						Remove swatch
					</template>
				</with-simple-tooltip>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch, Ref, computed } from 'vue'
import ColorDefinition from '@/components/form/ColorDefinition.vue'
import TextInput from '@/components/form/TextInput.vue'
import IconButton from '@/components/general/IconButton.vue'
import WithSimpleTooltip from '@/components/general/WithSimpleTooltip.vue'
import { usePalettesStore } from '../stores/palettes'
import { useAppStore } from '../stores/app'
import tinyColor from 'tinycolor2'
import { PaletteColor } from '../types/palette'
import { ColorPickerModel } from '../types/ColorPicker'
import { hexStringFromRGB } from '../utils/hexStringFromRGB'

export default defineComponent( {
	components: {
		ColorDefinition,
		TextInput,
		IconButton,
		WithSimpleTooltip,
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