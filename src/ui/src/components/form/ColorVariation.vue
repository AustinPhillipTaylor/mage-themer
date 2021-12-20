
<template>
	<div class="color-variations">

		<div
			class="variation-labels"
			v-if="variations.length > 0"
		>
			<div class="top-row-label"><!-- Extra options --></div>
			<div class="top-row-label">Label</div>
			<div class="top-row-label">Mix Color</div>
			<div class="top-row-label">Amount (%)</div>
		</div>

		<template
			v-for="step in variations"
			:key="step.guid"
		>
			<div class="variation">
				<input
					type="checkbox"
					:id="'tog-' + step.guid"
					:style="{display: 'none'}"
					class="advanced-options-toggle"
				>
				<label
					:for="'tog-' + step.guid"
					class="material-icons-outlined expand-more"
				>
					expand_more
				</label>
				<text-input
					v-model="step.label"
					class="variation-label"
					:id="'colorLabel-' + step.guid"
					placeholder="Label"
				/>
				<select-menu
					v-model="step.mixingColor"
					:id="'mixPalette-' + step.guid"
					class="mix-color"
					:unset="{
						value: '',
						text: '-- Select Mix Color --'
					}"
					:options="mixingOptions"
					:select-error="swatchError(step)"
					error-text="Missing swatch from mixing palette"
					no-options-text="No mixing colors selected"
				>
					<template
						#before-selected="workingOption"
					>
						<template v-if="workingOption.value">
							<div
								:style="{
									background: hexStringFromRGB( colorList[workingOption.value].rgb ),
									//@ts-ignore
									'--red': colorList[workingOption.value].rgb.r,
									'--green': colorList[workingOption.value].rgb.g,
									'--blue': colorList[workingOption.value].rgb.b,
								}"
								class="color-preview"
							></div>
						</template>
					</template>
				</select-menu>
				<number-input
					v-model="step.percentage"
					:id="'percent-' + step.guid"
					class="mix-percentage"
					placeholder="%"
					min="0"
					max="100"
					:arrows="true"
					icon="blend"
				/>
				<div class="expanded-options">
					<div class="delete-item-wrapper">
						<div
							class="material-icons-outlined delete-item"
							@click="() => deleteVariation(step.guid)"
						>
							close
						</div>
						<div class="tooltip">Delete color variant</div>
					</div>
					<div class="advanced-options">
						<toggle-input
							v-model="step.customNamingScheme"
							:id="'csToggle-' + step.guid"
							label="Override naming scheme for this variation?"
						/>
						<template-text-input
							v-model="step.namingScheme"
							:id="'customScheme-' + step.guid"
							label="Variation naming scheme"
							placeholder="Naming Scheme"
							:templates="propTemplates"
							:disabled="!step.customNamingScheme"
						/>
					</div>
				</div>
			</div>
		</template>
	</div>
	<div
		class="add-new-variation"
		@click="addColorVariation"
	> + Add color variation </div>
</template>

<script lang="ts">
import { defineComponent, ComputedRef, computed, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { ColorVariation } from '../../types/Theme'
import { SelectOption } from '../../types/SelectOption'
import { usePalettesStore } from '../../stores/palettes'
import { hexStringFromRGB } from '../../utils/hexStringFromRGB'
import TextInput from './TextInput.vue'
import NumberInput from './NumberInput.vue'
import SelectMenu from './SelectMenu.vue'
import ToggleInput from './ToggleInput.vue'
import TemplateTextInput from './TemplateTextInput.vue'
import { PaletteColors } from '../../types/Palette'
import { propTemplates } from '../../data/nameSchemeTemplates'

export default defineComponent( {
	components: {
		TextInput,
		NumberInput,
		SelectMenu,
		ToggleInput,
		TemplateTextInput,
	},
	props: {
		modelValue: {
			type: Array as PropType<ColorVariation[]>,
			required: false,
			default: () => [],
		},
		mixingOptions: {
			type: Array as PropType<SelectOption[]>,
			required: false,
			default: () => [],
		},
		colorList: {
			type: Object as PropType<PaletteColors>,
			required: false,
			default: () => ( {} ),
		},
	},
	setup( props, { emit } ) {

		const paletteStore = usePalettesStore()
		const palettes = paletteStore.palettes

		const variations: ComputedRef<ColorVariation[]> = computed( (): ColorVariation[] => {
			return props.modelValue || []
		} )

		const addColorVariation = () => {
			const newColorStep: ColorVariation = {
				guid: uuidv4(),
				label: '',
				mixingColor: '',
				percentage: 0,
				customNamingScheme: false,
				namingScheme: [],
			}
			variations.value.push( newColorStep )
			emit( 'update:modelValue', variations.value )
		}


		function swatchError( step: ColorVariation ) {
			// We don't want to show an error if it's empty or undefined
			if( step.mixingColor ) {
				if( props.colorList[step.mixingColor] ) {
					return false
				}
				// Only return here if mixingPalette is non-falsy value and value doesn't exist in palettes
				return true
			}
			return false
		}

		function deleteVariation( guid: string ) {
			const filteredVariationList = variations.value.filter( ( variation ) => {
				return variation.guid !== guid
			} )
			emit( 'update:modelValue', filteredVariationList )
		}

		return {
			computed,
			palettes,
			variations,
			swatchError,
			deleteVariation,
			hexStringFromRGB,
			addColorVariation,
			propTemplates,
		}
	},
} )
</script>