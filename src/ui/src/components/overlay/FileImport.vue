<template>
	<div class="modal-wrapper" >
		<div class="modal"></div>
	</div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, watch, Ref, WatchStopHandle, computed, PropType } from 'vue'

export default defineComponent( {
	props: {
		file: {
			type: File,
			required: true,
		},
		closeOverlay: {
			type: Function,
			required: true,
		},
	},
	setup( props ) {

		console.log( props.file )
		return {
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.modal-wrapper
	position: absolute
	top: 0
	left: 0
	width: 100vw
	height: 100vh
	background: colors.$modal-under
	display: grid
	justify-items: center
	align-items: center
	.modal
		background: colors.$modal-bg
		border-radius: 4px
		height: auto
		min-height: 100px
		width: 100%
		max-width: 800px
</style>
