
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
				<select-input
					v-model="step.mixingColor"
					:id="'mixPalette-' + step.guid"
					class="mix-color"
					:unset="{
						value: '',
						text: '-- Select Mix Color --'
					}"
					:options="mixingOptions"
					:selectError="swatchError(step)"
					errorText="Missing swatch from mixing palette"
					emptyText="No mixing colors selected"
				>
					<template
						#before-option="workingOption"
					>
						<template v-if="workingOption.value">
							<div
								:style="{
									background: hexStringFromRGB( colorList[workingOption.value].rgb ),
								}"
								class="color-preview"
							></div>
						</template>
					</template>
				</select-input>
				<number-input
					v-model="step.percentage"
					:id="'percent-' + step.guid"
					class="mix-percentage"
					placeholder="%"
					min="0"
					max="100"
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
import SelectInput from './SelectInput.vue'
import ToggleInput from './ToggleInput.vue'
import TemplateTextInput from './TemplateTextInput.vue'
import { PaletteColors } from '../../types/Palette'
import { propTemplates } from '../../data/nameSchemeTemplates'

export default defineComponent( {
	components: {
		TextInput,
		NumberInput,
		SelectInput,
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

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.color-variations
	margin: 24px 0
	display: grid
	grid-template-columns: 28px 200px 1fr auto
	align-items: center
	grid-gap: 8px
	.top-row-label,
	.variation-label,
	.mix-percentage,
	.mix-color
		display: inline-block
		margin: 0
		vertical-align: middle
		white-space: nowrap
	.variation-labels
		display: contents
	.variation
		display: contents
	.mix-color
		min-width: 200px
		.color-preview
			display: inline-block
			height: 17px
			width: 17px
			border-radius: 50%
			margin-right: 6px
			vertical-align: middle
			border: 1px solid colors.$input-select-preview-swatch-border
	.variation-label
		min-width: 120px
	.top-row-label
		@include fonts.input-label
	.expanded-options
		display: none
		grid-template-columns: 28px 1fr
		min-height: 32px
		grid-gap: 8px
		grid-column: 1/-1
		.advanced-options
			grid-column: 2/-1
			background: colors.$gray-10
			border-radius: 4px
			padding: 0 16px
		.delete-item-wrapper
			height: min-content
			position: relative
			.tooltip
				@include fonts.tooltip
				z-index: 999999
				display: none
				padding: 4px 8px
				white-space: nowrap
				position: absolute
				left: 0
				top: 100%
				background: colors.$main-dark
				color: colors.$main-light
				pointer-events: none
				border-radius: 0 4px 4px 4px
				&:before
					content: ""
					display: block
					width: 0
					height: 0
					border: 8px solid transparent
					border-left: 8px solid colors.$main-dark
					position: absolute
					top: -8px
					left: 0px
			.delete-item
				&:hover
					&+.tooltip
						display: inline-block
	.advanced-options-toggle
		&:checked
			&+.material-icons-outlined
				&.expand-more
					background: colors.$action-icon-active-bg
					transform: rotate(180deg)
					&:hover
						background: colors.$action-icon-hover-bg
				&~.expanded-options
					display: grid
	.material-icons-outlined
		@include fonts.material-icons
		&.expand-more
			padding: 4px
			display: inline-block
			background: colors.$action-icon-bg
			border-radius: 4px
			cursor: pointer
			height: 28px
			width: 28px
			justify-self: center
			&:hover
				background: colors.$action-icon-hover-bg
		&.delete-item
			padding: 4px
			background: colors.$sidebar-link-active-bg
			border-radius: 4px
			cursor: pointer
			height: 28px
			width: 28px
			justify-self: center
			&:hover
				background: colors.$icon-danger-bg
				color: colors.$icon-danger-text
.add-new-variation
	@include fonts.secondary-button
	display: block
	width: 100%
	padding: 8px
	border-radius: 4px
	text-align: center
	margin: 8px 0
	background: colors.$secondary-button-bg
	color: colors.$secondary-button-text
	cursor: pointer
	&:hover
		background: colors.$secondary-button-hover-bg
		color: colors.$secondary-button-hover-text
	&:active
		background: colors.$secondary-button-active-bg
</style>
