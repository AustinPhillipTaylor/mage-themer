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
			<div class="title type type--bold">
				Select Color
			</div>
			<icon-button
				class="close-modal"
				type="close"
				@click="closeOverlay"
			></icon-button>
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
import IconButton from '../general/IconButton.vue'
import { Chrome } from '@ckpack/vue-color'
import { ColorPickerModel } from '../../types/ColorPicker'

export default defineComponent( {
	components: {
		'color-picker': Chrome,
		IconButton,
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