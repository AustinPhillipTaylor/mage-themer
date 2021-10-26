
<template>
	<div class="view-theme">
		Theme view
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { Theme } from '../types/theme'

export default defineComponent( {
	props: {
		data: {
			type: Object as PropType<Theme>,
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
