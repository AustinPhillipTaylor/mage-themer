
<template>
	<div class="number-input">
		<template v-if="label">
			<label
				:for="id"
				class="section-title"
			>{{ label }}</label>
		</template>
		<div
			:class="[
				'number-input-wrapper',
				{
					'number-input-with-icon': icon,
					'number-input-with-arrows': arrows,
				}
			]"
		>
			<div
				v-if="icon"
				:class="[
					'icon',
					`icon--${icon}`,
					'num-adjust-icon'
				]"
				@mousedown="startDragging"
			></div>
			<input
				ref="numberField"
				:id="id"
				:value="displayValue"
				@input="updateNumber"
				@keydown.up="adjustValue($event, 1)"
				@keydown.down="adjustValue($event, -1)"
				:placeholder="placeholder"
				:maxLength="maxLength"
				:size="maxLength"
				type="text"
				class="number-input-field"
			>
			<div
				v-if="arrows"
				class="adjustment-arrows"
			>
				<div
					class="num-increase"
					@mousedown="adjustValue($event, 1)"
				>
					<div class="icon icon--caret-up"></div>
				</div>
				<div
					class="num-decrease"
					@mousedown="adjustValue($event, -1)"
				>
					<div class="icon icon--caret-down"></div>
				</div>
			</div>
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
		icon: {
			type: String,
			required: false,
			default: '',
		},
		arrows: {
			type: Boolean,
			required: false,
			default: false,
		},
		suffix: {
			type: String,
			required: false,
			default: ' %',
		},
	},
	setup( props, { emit } ) {

		const displayValue = ref( `0${ props.suffix }` )

		watch(
			() => props.modelValue,
			( val ) => {
				if( val || val === 0 ) {
					displayValue.value = val.toString() + props.suffix
				}
			},
			{ immediate: true }
		)

		const numberField: Ref<HTMLElement | null> = ref( null )

		const minNum = parseInt( props.min, 10 )
		const maxNum = parseInt( props.max, 10 )

		const maxLength = computed( ()=>{
			const suffixLength = props.suffix.length
			const minLength = props.min.length + suffixLength
			const maxLength = props.max.length + suffixLength
			return Math.max( maxLength, minLength )
		} )

		function emitUp( num: number ) {
			emit( 'update:modelValue', num )
		}

		function clamp( min: number, max: number, num: number ) {
			return Math.max( min, Math.min( num, max ) )
		}

		function adjustValue( evt: Event, amount = 1 ) {
			evt.preventDefault()
			numberField.value?.focus()
			const newValue = ( props.modelValue || 0 ) + amount
			emitUp( clamp( minNum, maxNum, newValue ) )
		}

		function updateNumber( evt: Event ) {
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
			const clampedNum = clamp( minNum, maxNum, numValue )


			if( isNaN( numValue ) ) {
				displayValue.value = stringValue
				// We'll emit 0 if the field is NaN or empty
				emitUp( 0 )
			} else {
				displayValue.value = clampedNum.toString()
				emitUp( clampedNum )
			}

		}

		// Icon dragging
		const dragging = ref( false )
		const initialMouseX = ref( 0 )
		const initialModelValue = ref( 0 )

		function startDragging( e: MouseEvent ) {
			initialMouseX.value = e.clientX
			initialModelValue.value = props.modelValue || 0
			window.addEventListener( 'mousemove', dragValue )
			window.addEventListener( 'mouseup', endDragging )
			dragging.value = true
		}
		function endDragging() {
			initialMouseX.value = 0
			initialModelValue.value = 0
			window.removeEventListener( 'mousemove', dragValue )
			window.removeEventListener( 'mouseup', endDragging )
			dragging.value = false
		}
		function dragValue( e: any ) {
			e.preventDefault()
			const newValue = initialModelValue.value + ( e.clientX - initialMouseX.value ) * .5
			emitUp( clamp( minNum, maxNum, Math.round( newValue ) ) )
		}


		return {
			maxLength,
			adjustValue,
			numberField,
			updateNumber,
			displayValue,
			startDragging,
		}
	},
} )
</script>