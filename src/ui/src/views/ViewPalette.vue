
<template>
	<div class="view-palette">
		Palette view
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { Palette } from '../types/palette'

export default defineComponent( {
	props: {
		data: {
			type: Object as PropType<Palette>,
			required: true,
		},
	},
	setup() {

		return {
		}
	},
} )
</script>

<style lang="sass" scoped>

</style>
