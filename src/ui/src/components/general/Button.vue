<template>
	<button
		:class="[
			'button',
			`button--${type}${destructive ? '-destructive' : ''}`
		]"
		:disabled="disabled"
	>
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent( {
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
} )
</script>