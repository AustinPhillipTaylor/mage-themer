<template>
	<div
		class="color-definition"
	>
		<div
			class="color-swatch"
			@click="$emit('click:color', $event)"
			:style="{
				background: hexStringFromRGB(rgb),
				//@ts-ignore
				'--red': rgb.r,
				'--green': rgb.g,
				'--blue': rgb.b,
			}"
		>
			<div class="color-info type--medium" >
				{{ hexStringFromRGB(rgb) }}
			</div>
		</div>
		<text-input
			:model-value="name"
			@update:modelValue="$emit('update:name', $event)"
			:id="id"
			class="color-name-input"
			placeholder="Color Name"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue'
import { hexStringFromRGB } from '@/utils/hexStringFromRGB'
import TextInput from './TextInput.vue'

export default defineComponent( {
	components: {
		TextInput,
	},
	props: {
		rgb: {
			type: Object as PropType<RGB>,
			required: true,
		},
		name: {
			type: String,
			required: false,
			default: '',
		},
		id: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	setup() {

		return {
			hexStringFromRGB,
		}
	},
} )
</script>