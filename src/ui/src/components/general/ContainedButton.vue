<template>
	<div
		:class="[
			'contained-button',
			{
				'with-chevron': chevron
			}
		]"
	>
		<slot></slot>
		<div
			class="chevron"
			v-if="chevron"
		></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent( {
	props: {
		chevron: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	setup() {
		return {
		}
	},
} )
</script>