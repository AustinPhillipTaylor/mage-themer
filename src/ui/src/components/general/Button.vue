<template>
	<button
		:class="[
			'button',
			`button--${type}${destructive ? '-destructive' : ''}`
		]"
		ref="button"
		:disabled="disabled"
	>
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue'

export default defineComponent( {
	name: 'Button',
	props: {
		type: {
			type: String as PropType<(
												'primary' |
												'secondary' |
												'tertiary'
											)>,
			required: false,
			default: 'primary',
		},
		destructive: {
			type: Boolean,
			required: false,
			default: false,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	setup() {
		const button: Ref<HTMLButtonElement | null> = ref( null )

		return {
			button,
		}
	},
} )
</script>