<template>
	<div
		:class="[
			'button-with-menu',
			{
				'disabled': disabled
			}
		]"
		tabindex="0"
		ref="menuContainer"
		@blur="unsetMenu()"
		@focus="!disabled && toggleMenu()"
	>
		<div
			ref="button"
			:class="[
				'button-display',
				{
					'is-active': isOpen
				}
			]"
		>
			<slot name="display">Button</slot>
		</div>
		<div
			:class="[
				'overlay-menu',
				{
					'open': isOpen
				}
			]"
			:style="{
				height: menuHeight !== null ? menuHeight + 'px' : 'auto',
				bottom: fromBottom !== null ? fromBottom + 'px' : '0px',
				left: fromLeft !== null ? fromLeft + 'px' : '-500%'
			}"
		>
			<div
				class="arrow"
				:style="{
					left: arrowFromLeftMenu + 'px' || '5px',
					zIndex: 9
				}"
				v-show="useArrow"
			></div>
			<menu-wrapper
				ref="menuWrapperElm"
				@item-selected="( e: any ) => {
					unsetMenu()
					$emit('item-selected', e)
				}"
				:options="options"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType } from 'vue'
import MenuWrapper from '@/components/general/MenuWrapper.vue'
import { MenuOption } from '@/types/MenuOptions'

export default defineComponent( {
	components: {
		MenuWrapper,
	},
	props: {
		menuMargin: {
			type: Number,
			required: false,
			default: 0,
		},
		options: {
			type: Array as PropType<MenuOption[]>,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	setup( props ) {

		const arrowHeight = 6

		const isOpen = ref( false )
		const button: Ref<HTMLElement | null> = ref( null )
		const menuWrapperElm: Ref<any> = ref( null )
		const menuContainer: Ref<HTMLElement | null> = ref( null )
		const menuHeight: Ref<number | string | null> = ref( null )
		const fromBottom: Ref<number | string | null> = ref( null )
		const fromLeft: Ref<number | string | null> = ref( null )
		const useArrow = ref( true )
		const arrowFromLeftMenu = ref( 5 )

		function buttonDetails() {
			const elm = ( button.value as HTMLElement ).getBoundingClientRect()
			const details = {
				width: elm.width,
				height: elm.height,
				leftX: elm.x,
				rightX: elm.x + elm.width,
				topY: elm.y,
				bottomY: elm.y + elm.height,
			}
			return details
		}

		function menuDetails() {
			const elm = ( menuWrapperElm.value!.getRef() ).getBoundingClientRect()
			const details = {
				width: elm.width,
				height: elm.height,
			}
			return details
		}

		function pageDetails() {
			const details = {
				width: window.innerWidth,
				height: window.innerHeight,
			}
			return details
		}

		function setDimensions() {
			const button = buttonDetails()
			const menu = menuDetails()
			const page = pageDetails()

			const arrowMenuHeight = menu.height + arrowHeight + props.menuMargin
			const marginMenuHeight = menu.height + props.menuMargin * 2

			const spaceBelow = page.height - button.bottomY

			if( spaceBelow >= arrowMenuHeight ) {
				fromBottom.value = spaceBelow - ( arrowHeight + menu.height )
				useArrow.value = true
			} else {
				useArrow.value = false
				fromBottom.value = props.menuMargin
			}

			if(	page.height < marginMenuHeight ) {
				menuHeight.value = page.height - props.menuMargin * 2
			} else {
				menuHeight.value = menu.height
			}

			if(
				// distance from left to center of clicked button
				( button.leftX + ( button.width / 2 ) ) <
				// is less than one half the width of the menu plus its margin
				( ( menu.width + props.menuMargin * 2 ) / 2 )
			) {
				// Set as close to left side as we're allowed
				fromLeft.value = props.menuMargin
			} else if(
				// distance from left to center of clicked button
				( ( button.leftX + ( button.width / 2 ) ) +
				// plus one half the width of the menu plus its margin
				( ( menu.width + props.menuMargin * 2 ) / 2 ) ) >
				// is greater than the width of the window
				page.width
			) {
				// Set as close to right side as we're allowed
				fromLeft.value = page.width - ( props.menuMargin + menu.width )
			} else {
				// If we're not too close to either side, just center with button clicked
				fromLeft.value = ( button.leftX + ( button.width / 2 ) ) - ( menu.width / 2 )
			}

			if( useArrow.value ) {
				const leftMin = 5
				// 19 = min distance of arrow from edge (5) plus width of arrow element (14)
				const leftMax = menu.width - 19

				const buttonCenter = button.leftX + ( button.width / 2 )

				// Center of button minus half of arrow width minus distance that menu is from edge
				const placementRelToMenu = buttonCenter - 7 - fromLeft.value

				arrowFromLeftMenu.value = clamp( leftMin, leftMax, placementRelToMenu )
			}

		}

		function clamp( min: number, max: number, num: number ) {
			return Math.max( min, Math.min( num, max ) )
		}

		function toggleMenu() {
			if( isOpen.value === false ) {
				setDimensions()
				isOpen.value = true
			} else {
				unsetMenu()
			}
		}

		function unsetMenu() {
			menuContainer.value?.blur()
			isOpen.value = false
			useArrow.value = true
			menuHeight.value = null
			fromBottom.value = null
			fromLeft.value = null
		}

		return {
			isOpen,
			menuWrapperElm,
			button,
			toggleMenu,
			unsetMenu,
			menuHeight,
			fromBottom,
			fromLeft,
			useArrow,
			arrowFromLeftMenu,
			menuContainer,
		}
	},
} )
</script>