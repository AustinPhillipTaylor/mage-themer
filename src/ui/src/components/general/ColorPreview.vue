<template>
	<div
		:style="{
			background: hexStringFromRGB( rgb ),
			//@ts-ignore
			'--red': rgb.r,
			'--green': rgb.g,
			'--blue': rgb.b,
		}"
		class="color-preview"
	></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { hexStringFromRGB } from '@/utils/hexStringFromRGB'

export default defineComponent( {
	name: 'Button',
	props: {
		rgb: {
			type: Object as PropType<RGB>,
			required: true,
		},
	},
	setup() {
		return {
			hexStringFromRGB,
		}
	},
} )
</script>