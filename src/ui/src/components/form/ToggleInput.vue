
<template>
	<div class="toggle-wrapper" >
		<div class="switch">
			<input
				class="switch__toggle"
				type="checkbox"
				:id="id"
				@input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
				:checked="modelValue"
			>
			<label
				class="switch__label type--medium"
				:for="id"
			>{{ label }}</label>
		</div>
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
			default: 'Toggle',
		},
		modelValue: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
} )
</script>
