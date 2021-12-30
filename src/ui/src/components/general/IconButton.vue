<template>
	<div
		class="icon-button"
		@click="callback"
	>
		<div
			:style="{
				cursor: 'pointer'
			}"
			:class="['icon', `icon--${type}`]"
		>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent( {
	props: {
		type: {
			type: String,
			required: false,
			default: 'plus',
		},
		callback: {
			type: Function as PropType<( ( payload: MouseEvent ) => any )>,
			required: false,
			default: () => null,
		},
	},
} )
</script>