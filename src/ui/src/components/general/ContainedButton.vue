<template>
	<div
		:class="[
			'contained-button',
			{
				'with-chevron': chevron,
				'disabled': disabled
			}
		]"
		:style="{
			height: `var(--size-${buttonHeight})`
		}"
	>
		<slot></slot>
		<div
			class="chevron"
			v-if="chevron"
		></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

export default defineComponent( {
	props: {
		chevron: {
			type: Boolean,
			required: false,
			default: false,
		},
		buttonHeight: {
			type: String as PropType<(
												'xxxsmall' |
												'xxsmall' |
												'xsmall' |
												'small' |
												'medium' |
												'large' |
												'xlarge' |
												'xxlarge' |
												'xxxlarge'
											)>,
			required: false,
			default: 'large',
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
} )
</script>