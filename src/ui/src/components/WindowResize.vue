<template>
	<span
		@mousedown="startDragging"
		class="resize-handle"
	>
		<span></span>
	</span>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { sendFigmaMessage } from '../utils/sendFigmaMessage'

export default defineComponent( {
	props: {
		msg: String,
	},
	setup() {
		const dragging = ref( false )

		const startDragging = () => {
			sendFigmaMessage( {
				type: 'resizerClicked',
			} )
			window.addEventListener( 'mousemove', windowResize )
			window.addEventListener( 'mouseup', endDragging )
			dragging.value = true
		}
		const endDragging = () => {
			window.removeEventListener( 'mousemove', windowResize )
			window.removeEventListener( 'mouseup', endDragging )
			dragging.value = false
		}
		const windowResize = ( e: any ) => {
			e.preventDefault()
			sendFigmaMessage( {
				type: 'resizeWindow',
				widthAdd: e.movementX,
				heightAdd: e.movementY,
			} )
		}

		return {
			startDragging,
		}
	},
} )
</script>

<style lang="sass" scoped>
.resize-handle
	z-index: 9999999999999
	display: block
	width: 14px
	height: 14px
	position: fixed
	bottom: 0
	right: 0
	background: transparent
	cursor: nwse-resize
	span
		display: inline-block
		width: 12px
		height: 12px
		background-image: radial-gradient(#c0c0c0 40%, transparent 40%)
		background-size: 4px 4px
		background-position: 0 100%
		background-repeat: repeat-x

		&::before, &::after
			background-image: radial-gradient(#c0c0c0 40%, transparent 40%)
			background-size: 4px 4px
			background-position: 0 100%
			background-repeat: repeat-x

		&::before, &::after
			content: ''
			display: block
			height: 33%

		&::before
			width: 33%
			margin-left: 66%

		&::after
			width: 66%
			margin-left: 33%
</style>
