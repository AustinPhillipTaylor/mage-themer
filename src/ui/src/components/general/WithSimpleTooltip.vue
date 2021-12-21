<template>
	<div
		class="item-with-tooltip"
		ref="itemWithTooltip"
	>
		<slot name="contents"></slot>
	</div>
	<div
		ref="tooltipContainer"
		:class="[
			'simple-tooltip',
			{
				'active': showTooltip
			}
		]"
		:style="{
			bottom: fromBottom !== null ? fromBottom + 'px' : '0px',
			left: fromLeft !== null ? fromLeft + 'px' : '-500%'
		}"
	>
		<div
			:class="[
				'arrow',
				{
					'top': !arrowOnBottom,
					'bottom': arrowOnBottom
				}
			]"
			:style="{
				left: arrowFromLeft + 'px' || '5px',
				zIndex: 9
			}"
		></div>
		<div
			class="tooltip-content"
		>
			<slot name="tooltip">Tooltip</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType, onMounted } from 'vue'

export default defineComponent( {
	props: {
		horizontalMargin: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	setup( props ) {

		const arrowHeight = 6

		const showTooltip = ref( false )

		const itemWithTooltip: Ref<HTMLElement | null> = ref( null )

		const tooltipContainer: Ref<HTMLElement | null> = ref( null )
		const fromBottom: Ref<number | string | null> = ref( null )
		const fromLeft: Ref<number | string | null> = ref( null )

		const arrowOnBottom = ref( false )
		const arrowFromLeft = ref( 5 )

		onMounted( () => {
			itemWithTooltip.value!.addEventListener( 'mouseover', hoverElm )
			itemWithTooltip.value!.addEventListener( 'mouseout', unHoverElm )
		} )

		function hoverElm() {
			setTooltipPosition()
			showTooltip.value = true
		}

		function unHoverElm() {
			showTooltip.value = false
		}

		function elmDetails() {
			const elm = itemWithTooltip.value!.getBoundingClientRect()
			const details = {
				width: elm.width,
				height: elm.height,
				leftX: elm.x,
				rightX: elm.x + elm.width,
				topY: elm.y,
				bottomY: elm.y + elm.height,
			}
			console.log( 'Element: ', details )
			console.log( itemWithTooltip.value )
			return details
		}

		function tooltipDetails() {
			const elm = ( tooltipContainer.value as HTMLElement ).getBoundingClientRect()
			const details = {
				width: elm.width,
				height: elm.height,
			}
			console.log( 'Tooltip: ', details )
			return details
		}

		function pageDetails() {
			const details = {
				width: window.innerWidth,
				height: window.innerHeight,
			}
			console.log( 'Page: ', details )
			return details
		}

		function setTooltipPosition() {
			const item = elmDetails()
			const tooltip = tooltipDetails()
			const page = pageDetails()

			const spaceBelow = page.height - item.bottomY
			const spaceAbove = item.topY

			// We'll place tooltip above or below, simply depending on which
			// side is most spacious
			if( spaceBelow >= spaceAbove ) {
				arrowOnBottom.value = false
				fromBottom.value = spaceBelow - ( arrowHeight + tooltip.height )
			} else {
				arrowOnBottom.value = true
				fromBottom.value = spaceBelow + arrowHeight + item.height
			}

			if(
				// distance from left to center of clicked item
				( item.leftX + ( item.width / 2 ) ) <
				// is less than one half the width of the tooltip plus its margin
				( ( tooltip.width + props.horizontalMargin * 2 ) / 2 )
			) {
				// Set as close to left side as we're allowed
				fromLeft.value = props.horizontalMargin
			} else if(
				// distance from left to center of clicked item
				( ( item.leftX + ( item.width / 2 ) ) +
				// plus one half the width of the tooltip plus its margin
				( ( tooltip.width + props.horizontalMargin * 2 ) / 2 ) ) >
				// is greater than the width of the window
				page.width
			) {
				// Set as close to right side as we're allowed
				fromLeft.value = page.width - ( props.horizontalMargin + tooltip.width )
			} else {
				// If we're not too close to either side, just center with item clicked
				fromLeft.value = ( item.leftX + ( item.width / 2 ) ) - ( tooltip.width / 2 )
			}


			// Setting arrow positioning

			const leftMin = 5
			// 19 = min distance of arrow from edge (5) plus width of arrow element (14)
			const leftMax = tooltip.width - 19

			const itemCenter = item.leftX + ( item.width / 2 )

			// Center of item minus half of arrow width minus distance that tooltip is from edge
			const placementRelToTooltip = itemCenter - 7 - fromLeft.value

			arrowFromLeft.value = clamp( leftMin, leftMax, placementRelToTooltip )

		}

		function clamp( min: number, max: number, num: number ) {
			return Math.max( min, Math.min( num, max ) )
		}

		return {
			itemWithTooltip,
			arrowOnBottom,
			showTooltip,
			fromBottom,
			fromLeft,
			arrowFromLeft,
			tooltipContainer,
		}
	},
} )
</script>