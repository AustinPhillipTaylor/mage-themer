
<template>
	<div class="color-variation-steps">

		<template v-if="variations.length > 0">
			<div class="top-row-label">Label</div>
			<div class="top-row-label">Mix Color</div>
			<div class="top-row-label">Amount (%)</div>
		</template>

		<template
			v-for="step in variations"
			:key="step.guid + '-' + Date.now()"
		>
			<text-input
				v-model="step.label"
				class="variation-label"
				id="colorLabel"
				placeholder="Label"
			/>
			<select-input
				v-model="step.mixingColor"
				id="mixingPaletteSelection"
				class="mix-color"
				:unset="{
					value: '',
					text: '-- Select Mix Color --'
				}"
				:options="mixingOptions"
				emptyText="No mixing colors selected"
			/>
			<number-input
				v-model="step.percentage"
				id="mixPercentage"
				class="mix-percentage"
				placeholder="%"
				min="0"
				max="100"
			/>
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
import TextInput from './TextInput.vue'
import NumberInput from './NumberInput.vue'
import SelectInput from './SelectInput.vue'

export default defineComponent( {
	components: {
		TextInput,
		NumberInput,
		SelectInput,
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
	},
	setup( props, { emit } ) {

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
			}
			variations.value.push( newColorStep )
			emit( 'update:modelValue', variations.value )
		}

		return {
			variations,
			addColorVariation,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.color-variation-steps
	margin: 24px 0
	display: grid
	grid-template-columns: 1fr 1fr auto
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
	.mix-color
		min-width: 200px
	.variation-label
		min-width: 120px
	.top-row-label
		@include fonts.input-label
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
