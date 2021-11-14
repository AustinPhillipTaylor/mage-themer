<template>
	<div
		class="color-picker-float"
		:style="{
			top: position.y + 'px',
			left: position.x + 'px',
		}"
	>
		<div
			@mousedown="startDragging"
			class="color-picker-header"
		>
			<div class="color-picker-title">
				Select Color
			</div>
			<div
				class="material-icons-outlined close-color-picker"
				@click="() => closeOverlay()"
			>
				close
			</div>
		</div>
		<color-picker
			v-model="colorPickerModel"
			@update:modelValue="doCallback"
			disableAlpha
			class="color-picker-inner"
		/>
	</div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, watch, Ref, WatchStopHandle, computed, PropType } from 'vue'
import tinyColor from 'tinycolor2'
import { Chrome } from '@ckpack/vue-color'
import { ColorPickerModel } from '../../types/ColorPicker'

export default defineComponent( {
	components: {
		'color-picker': Chrome,
	},
	props: {
		callback: {
			type: Function,
			required: true,
		},
		initialColor: {
			type: Object as PropType<ColorPickerModel>,
			required: false,
			default: () => ( {
				rgba: {
					r: 0,
					g: 0,
					b: 0,
					a: 1,
				},
			} ),
		},
		clickedComponent: {
			type: HTMLElement,
			required: true,
		},
		closeOverlay: {
			type: Function,
			required: true,
		},
	},
	setup( props ) {
		const dragging = ref( false )

		const startDragging = () => {
			window.addEventListener( 'mousemove', dragColorPicker )
			window.addEventListener( 'mouseup', endDragging )
		}
		const endDragging = () => {
			window.removeEventListener( 'mousemove', dragColorPicker )
			window.removeEventListener( 'mouseup', endDragging )
		}
		const dragColorPicker = ( e: MouseEvent ) => {
			e.preventDefault()
			position.value.x += e.movementX
			position.value.y += e.movementY
		}

		const positionDetails = ( () => {
			const elm = props.clickedComponent.getBoundingClientRect()
			const details = {
				picker: {
					width: 225,
					height: 266,
				},
				element: {
					width: elm.width,
					height: elm.height,
					leftX: elm.x,
					rightX: elm.x + elm.width,
					topY: elm.y,
				},
				page: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
			}
			return details
		} )()

		const optimalX = () => {
			console.log( positionDetails )
			let optimal = 0
			// Favor left side
			if(
				positionDetails.element.leftX >
				positionDetails.picker.width
			) {
				optimal = positionDetails.element.leftX - positionDetails.picker.width
			} else if(
				positionDetails.element.rightX +
				positionDetails.picker.width <
				positionDetails.page.width ) {
				optimal = positionDetails.element.rightX
			}
			return optimal
		}

		const optimalY = () => {
			let optimal = 0
			// Favor top of clicked element
			if(
				positionDetails.element.topY +
				positionDetails.picker.height <
				positionDetails.page.height ) {
				optimal = positionDetails.element.topY
			}
			else if(
				positionDetails.picker.height <
				positionDetails.page.height
			) {
				optimal = positionDetails.page.height - positionDetails.picker.height
			}
			return optimal
		}

		const position = ref( {
			x: optimalX(),
			y: optimalY(),
		} )

		const colorPickerModel: Ref<ColorPickerModel> = ref( props.initialColor )

		const doCallback = ( model: ColorPickerModel ) => {
			props.callback( model )
		}


		return {
			doCallback,
			colorPickerModel,
			position,
			startDragging,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.color-picker-float
	box-shadow: 0 0 2px rgb(0 0 0 / 25%), 0 4px 8px rgb(0 0 0 / 25%)
	z-index: 99999
	position: absolute
	background: #fff
	border-radius: 4px
	overflow: hidden
	.color-picker-header
		width: 100%
		height: auto
		padding: 4px 4px 4px 8px
		align-items: center
		display: grid
		grid-template-columns: auto min-content
		cursor: pointer
		.color-picker-title
			@include fonts.header
		.material-icons-outlined
			@include fonts.material-icons
			&.close-color-picker
				padding: 4px
				display: block
				background: colors.$action-icon-bg
				border-radius: 4px
				cursor: pointer
				height: 28px
				width: 28px
				&:hover
					background: colors.$action-icon-hover-bg
	.color-picker-inner
		box-shadow: none

</style>
