
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
			/>
		</div>
		<div class="mixing-color-select">
			<div class="palette-select">
				<select-input
					v-model="mixingColors"
					id="mixingPalette"
					label="Theme Mixing Colors"
					:unset="{
						value: '',
						text: '-- Select Palette --'
					}"
					:options="paletteOptions"
					emptyText="No palettes to select from. Please create a palette to populate your mixing colors."
				/>
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
				:mixingOptions="mixingOptions"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, toRefs, ref, reactive, computed, PropType } from 'vue'
import { useAppStore } from '../stores/app'
import { usePalettesStore } from '../stores/palettes'
import { useThemesStore } from '../stores/themes'
import TextInput from '../components/form/TextInput.vue'
import SelectInput from '../components/form/SelectInput.vue'
import ColorVariation from '../components/form/ColorVariation.vue'
import { SelectOption } from '../types/SelectOption'

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
		const {
			name,
			palette: themePalette,
			mixingColors,
			namingScheme,
			variationMapping,
		} = toRefs( themeStore.themes[props.guid] )

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

		const mixingOptions = computed( ()=> {
			if( mixingColors.value && palettes[mixingColors.value] ) {
				const mixGUID = mixingColors.value
				const mixcolors = palettes[mixGUID].colors

				const options: SelectOption[] = []
				for( const color in mixcolors ) {
					const formattedOption = {
						value: mixcolors[color].guid,
						text: mixcolors[color].name,
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
			mixingColors,
			namingScheme,
			variationMapping,
			paletteCount,
			paletteOptions,
		}
	},
} )
</script>

<style lang="sass" scoped>
.view-theme
	display: block
	width: 100%
	max-width: 600px
</style>
