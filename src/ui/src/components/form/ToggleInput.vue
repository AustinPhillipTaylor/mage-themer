
<template>
	<div class="toggle-switch on">
		<template v-if="label">
			<label :for="id">{{ label }}</label>
		</template>
		<input
			:id="id"
			:checked="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"

			type="checkbox"
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
			type: Boolean,
			required: false,
			default: false,
		},
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.toggle-switch
	display: block
	height: 28px
	width: 52px
	border: 2px solid colors.$input-toggle-border
	border-radius: 14px
	&.off
		background: colors.$input-toggle-track-off
	&.on
		background: colors.$input-toggle-track-on
</style>
