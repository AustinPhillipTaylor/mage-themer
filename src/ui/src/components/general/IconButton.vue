<template>
	<div
		class="icon-button"
		@click="callback"
	>
		<div
			:style="{
				cursor: 'pointer'
			}"
			:class="['icon', `icon--${type}`]"
		>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent( {
	props: {
		type: {
			type: String,
			required: false,
			default: 'plus',
		},
		callback: {
			type: Function as PropType<( ( payload: MouseEvent ) => any )>,
			required: false,
			default: () => null,
		},
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.add-entry
	user-select: none
	.add-entry-icon
		position: relative
		z-index: 999
		.options
			position: absolute
			top: 100%
			left: 0
			background: colors.$main-dark
			color: white
			padding: 4px
			border-radius: 0 4px 4px 4px
			display: none
			&:before
				content: ""
				display: block
				width: 0
				height: 0
				border: 8px solid transparent
				border-left: 8px solid #3d404c
				position: absolute
				top: -8px
				left: 0px
			&.open
				display: block
			span
				@include fonts.header-options
				white-space: nowrap
				padding: 4px 8px
				display: block
				border-radius: 2px
				color: colors.$main-light
				&:hover
					background: rgba(colors.$main-light, .1)
					cursor: pointer
</style>
