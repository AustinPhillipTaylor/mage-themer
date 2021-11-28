
<template>
	<div class="view-theme">
		<div class="theme-name">
			<text-input
				v-model="name"
				id="themeName"
				label="Theme Name"
				placeholder="Theme Name"
			/>
		</div>
		<div class="palette-select">
			<select-input
				v-model="themePalette"
				id="mainPalette"
				label="Theme Palette"
				:unset="{
					value: '',
					text: '-- Select Palette --'
				}"
				:options="paletteOptions"
				emptyText="No palettes to select from. Please create a palette to populate your theme."
			>
				<template
					#after-option="workingOption"
				>
					<template
						v-for="(color, guid) in palettes[workingOption.value].colors"
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
			</select-input>
		</div>
		<div class="mixing-color-select">
			<div class="palette-select">
				<select-input
					v-model="mixingPalette"
					id="mixingPalette"
					label="Theme Mixing Colors"
					:unset="{
						value: '',
						text: '-- Select Palette --'
					}"
					:options="paletteOptions"
					emptyText="No palettes to select from. Please create a palette to populate your mixing colors."
				>
					<template
						#after-option="workingOption"
					>
						<template
							v-for="(color, guid) in palettes[workingOption.value].colors"
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
				</select-input>
			</div>
		</div>
		<div class="naming-scheme">
			<text-input
				v-model="namingScheme"
				id="namingScheme"
				label="Naming Scheme"
				placeholder="Naming Scheme"
			/>
		</div>
		<div class="variations">
			<color-variation
				v-model="variationMapping"
				:colorList="mixingColorList || {}"
				:mixingOptions="mixingOptions"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue'
import { useAppStore } from '../stores/app'
import { usePalettesStore } from '../stores/palettes'
import { useThemesStore } from '../stores/themes'
import TextInput from '../components/form/TextInput.vue'
import SelectInput from '../components/form/SelectInput.vue'
import ColorVariation from '../components/form/ColorVariation.vue'
import { SelectOption } from '../types/SelectOption'
import { hexStringFromRGB } from '../utils/hexStringFromRGB'

export default defineComponent( {
	components: {
		TextInput,
		SelectInput,
		ColorVariation,
	},
	props: {
		guid: {
			type: String,
			required: true,
		},
	},
	setup( props ) {
		const appStore = useAppStore()

		const themeStore = useThemesStore()

		const curTheme = computed( () => themeStore.themes[props.guid] )

		const name = computed( {
			get: () => curTheme.value.name,
			set: ( val ) => {
				curTheme.value.name = val
			},
		} )
		const themePalette = computed( {
			get: () => curTheme.value.themePalette,
			set: ( val ) => {
				curTheme.value.themePalette = val
			},
		} )
		const mixingPalette = computed( {
			get: () => curTheme.value.mixingPalette,
			set: ( val ) => {
				curTheme.value.mixingPalette = val
			},
		} )
		const namingScheme = computed( {
			get: () => curTheme.value.namingScheme,
			set: ( val ) => {
				curTheme.value.namingScheme = val
			},
		} )
		const variationMapping = computed( {
			get: () => curTheme.value.variationMapping,
			set: ( val ) => {
				curTheme.value.variationMapping = val
			},
		} )

		const paletteStore = usePalettesStore()
		const palettes = paletteStore.palettes
		const paletteCount = computed( () => {
			return Object.keys( palettes ).length
		} )
		const paletteOptions = computed( () => {
			const options: SelectOption[] = []
			for( const palette in palettes ) {
				const formattedOption = {
					value: palettes[palette].guid,
					text: palettes[palette].name,
				}
				options.push( formattedOption )
			}
			return options
		} )

		watch(
			() => name.value,
			( name ) => {
				appStore.setHeaderTitle( name )
			}
		)

		const mixingColorList = computed( () => {
			if( mixingPalette.value && palettes[mixingPalette.value].colors ) {

				return palettes[mixingPalette.value].colors
			}
			return false
		} )

		const mixingOptions = computed( ()=> {
			if( mixingColorList.value ) {

				const options: SelectOption[] = []
				for( const color in mixingColorList.value ) {
					const formattedOption = {
						value: mixingColorList.value[color].guid,
						text: mixingColorList.value[color].name || hexStringFromRGB( mixingColorList.value[color].rgb ),
					}
					options.push( formattedOption )
				}
				if( options.length > 0 ) {
					return options
				}
				return [{
					value: '',
					text: 'No colors defined',
				}]
			}
			return []
		} )

		return {
			name,
			themePalette,
			palettes,
			mixingOptions,
			mixingPalette,
			namingScheme,
			mixingColorList,
			variationMapping,
			paletteCount,
			paletteOptions,
			hexStringFromRGB,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/colors'

.view-theme
	display: block
	width: 100%
	max-width: 800px
	.color-preview
		display: inline-block
		height: 17px
		width: 17px
		border-radius: 50%
		margin-left: 8px
		vertical-align: middle
		border: 1px solid colors.$input-select-preview-swatch-border
</style>
