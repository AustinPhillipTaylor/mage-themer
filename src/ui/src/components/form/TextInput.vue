
<template>
	<div class="text-input">
		<template v-if="label">
			<label :for="id">{{ label }}</label>
		</template>
		<input
			:id="id"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			:placeholder="placeholder"
			type="text"
		>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
			type: String,
			required: false,
			default: '',
		},
		placeholder: {
			type: String,
			required: false,
			default: '',
		},
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.text-input
	margin: 24px 0
	label
		@include fonts.input-label
		display: block
		padding: 0
		margin: 0 0 4px 0
	input[type=text]
		@include fonts.default-input
		display: block
		width: 100%
		padding: 8px 16px
		border-radius: 4px
		outline: none
		border: 2px solid colors.$input-text-border
		&:focus,
		&:focus-within
			border: 2px solid colors.$orange
</style>
