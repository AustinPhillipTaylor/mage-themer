
<template>
	<div class="number-input">
		<template v-if="label">
			<label :for="id">{{ label }}</label>
		</template>
		<div class="number-field-wrapper">
			<input
				ref="numberField"
				:id="id"
				:value="displayValue"
				@input="updateNumber"
				@keydown.up="increment"
				@keydown.down="decrement"
				:placeholder="placeholder"
				:maxLength="maxLength"
				:size="maxLength"
				type="text"
			>
			<div
				class="num-increase"
				@mousedown="increment"
			></div>
			<div
				class="num-decrease"
				@mousedown="decrement"
			></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed, watch } from 'vue'
export default defineComponent( {
	props: {
		id: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: false,
		},
		modelValue: {
			type: Number,
			required: false,
		},
		placeholder: {
			type: String,
			required: false,
			default: 'Number',
		},
		min: {
			type: String,
			required: false,
			default: '-100',
		},
		max: {
			type: String,
			required: false,
			default: '100',
		},
	},
	setup( props, { emit } ) {

		const displayValue = ref( '0' )

		watch(
			() => props.modelValue,
			( val ) => {
				const d = displayValue.value
				if( val && !( val === 0 && ( d === '' || d === '-' ) ) ) {
					displayValue.value = val.toString()
				}
			},
			{ immediate: true }
		)

		const numberField: Ref<HTMLElement | null> = ref( null )

		const minNum = parseInt( props.min, 10 )
		const maxNum = parseInt( props.max, 10 )

		const maxLength = computed( ()=>{
			const minLength = props.min.length
			const maxLength = props.max.length
			return Math.max( maxLength, minLength )
		} )

		function emitUp( num: number ) {
			emit( 'update:modelValue', num )
		}

		const increment = ( evt: Event ) => {
			evt.preventDefault()
			numberField.value?.focus()
			const newValue = ( props.modelValue || 0 ) + 1
			emitUp( Math.min( maxNum, newValue ) )
		}
		const decrement = ( evt: Event ) => {
			evt.preventDefault()
			numberField.value?.focus()
			const newValue = ( props.modelValue || 0 ) - 1
			emitUp( Math.max( minNum, newValue ) )
		}

		const updateNumber = ( evt: Event ) => {
			const curValue = ( evt.target as HTMLInputElement ).value || ''

			/**
			 * We set displayValue twice to force an update. If, for instance, a letter
			 * is typed into the field, we're essentially allowing the field to briefly
			 * display that letter, then immediately setting it to the correct value.
			 */
			displayValue.value = curValue

			// Remove everything except numbers and a leading hyphen
			const stringValue = curValue.replace( /(?!^-)\D+/g, '' )
			const numValue = parseInt( stringValue, 10 )
			const clampedNum = Math.max( minNum, Math.min( numValue, maxNum ) )


			if( isNaN( numValue ) ) {
				displayValue.value = stringValue
				// We'll emit 0 if the field is NaN or empty
				emitUp( 0 )
			} else {
				displayValue.value = clampedNum.toString()
				emitUp( clampedNum )
			}

		}

		return {
			maxLength,
			increment,
			decrement,
			numberField,
			updateNumber,
			displayValue,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.number-input
	margin: 0
	label
		@include fonts.input-label
		display: block
		padding: 0
		margin: 0 0 4px 0
	.number-field-wrapper
		position: relative
		display: inline-block
		.num-increase,
		.num-decrease
			width: 32px
			height: 14px
			position: absolute
			right: 4px
			border-radius: 2px
			cursor: pointer
			&:after
				position: absolute
				content: ""
				right: 11px
				width: 0
				height: 0
				border: 5px solid colors.$input-number-arrows
				border-left-color: transparent !important
				border-right-color: transparent !important
			&:hover
				background: colors.$input-select-item-hover-bg
				&:after
					border-color: colors.$input-number-arrow-hover
			&:active
				&:after
					border-color: colors.$input-number-arrow-active
		.num-increase
			top: 5px
			&:after
				top: -1px
				border-top-color: transparent !important
		.num-decrease
			bottom: 5px
			&:after
				bottom: -1px
				border-bottom-color: transparent !important
		input[type=text]
			@include fonts.default-input
			display: inline-block
			padding: 8px 48px 8px 16px
			border-radius: 4px
			outline: none
			border: 2px solid colors.$input-text-border
			&:focus,
			&:focus-within
				border: 2px solid colors.$orange
</style>
