<template>
	<div
		v-if="active"
		class="app-overlay"
	>
		<component
			:is="currentOverlay"
			:closeOverlay="unsetOverlay"
			:="{...props}"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, Component, computed, ComputedRef, toRefs, markRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../../stores/app'
import { overlayTypes } from '../../data/overlayMap'

export default defineComponent( {
	setup() {
		const appStore = useAppStore()
		const { unsetOverlay } = appStore
		const { overlay } = storeToRefs( appStore )
		const { active, overlayType, props } = toRefs( overlay.value )

		const currentOverlay: ComputedRef<Component> = computed( () => {
			if( overlayType.value && active.value ) {
				const component = overlayTypes[overlayType.value].overlayComponent
				return markRaw( component )
			}
			return {}
		} )

		return {
			unsetOverlay,
			currentOverlay,
			active,
			props,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts' as fonts

.app-overlay
	width: 0
	height: 0
	display: block
	position: absolute
	top: 0
	left: 0
	z-index: 999999999999
</style>
