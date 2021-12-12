<template>
	<div :class="['icon', `icon--${type}`]">
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
	props: {
		type: {
			type: String,
			required: false,
			default: 'plus',
		},
	},
} )
</script>
