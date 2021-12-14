
<template>
	<div class="text-input">
		<template v-if="label">
			<label
				:for="id"
				class="section-title"
			>{{ label }}</label>
		</template>
		<div
			:class="[
				'input',
				{
					'input--with-icon': icon
				}
			]"
		>
			<div
				v-if="icon"
				:class="[
					'icon',
					`icon--${icon}`
				]"
			></div>
			<input
				:id="id"
				:value="modelValue"
				autocomplete="off"
				@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
				:placeholder="placeholder"
				type="text"
				:disabled="disabled"
				class="input__field"
			>
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
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		icon: {
			type: String,
			required: false,
			default: '',
		},
	},
} )
</script>
