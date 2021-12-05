
<template>
	<div class="view-help">
		Help / Information
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent( {
	setup() {

		return {
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/colors'

.view-help
	display: block
	width: 100%
	max-width: 800px
</style>
