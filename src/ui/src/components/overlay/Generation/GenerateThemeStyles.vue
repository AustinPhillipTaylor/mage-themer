<template>
	<div class="modal-wrapper" >
		<div class="modal">
			<div class="modal-header">
				<div class="title">
					{{ title }}
				</div>
				<div
					class="material-icons-outlined close-modal"
					@click="cancellation"
				>
					close
				</div>
			</div>
			<perfect-scrollbar class="modal-body">
				<h4> Theme Preview - {{ name }}</h4>
				<color-list-tree :colorList="colorList"></color-list-tree>
			</perfect-scrollbar>
			<div class="modal-buttons">
				<button
					class="button danger"
					@click="cancellation"
				>
					{{ buttons.cancel|| 'Cancel' }}
				</button>
				<button
					class="button confirm"
					@click="confirmation"
				>
					{{ buttons.confirm || 'Confirm' }}
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref, PropType } from 'vue'
import { useThemesStore } from '../../../stores/themes'
import ColorListTree from './ColorListTree.vue'
import { generateStyles } from '../../../utils/setFigmaStyles'

export default defineComponent( {
	components: {
		ColorListTree,
	},
	props: {
		closeOverlay: {
			type: Function,
			required: true,
		},
		title: {
			type: String,
			required: false,
			default: 'Style Generation',
		},
		buttons: {
			type: Object as PropType<{ cancel: string; confirm: string }>,
			required: true,
		},
		guid: {
			type: String,
			required: true,
		},
	},
	setup( props ) {

		const themeStore = useThemesStore()
		const themes = themeStore.themes
		const thisTheme = themes[props.guid]
		const name = thisTheme.name

		const colorList = themeStore.getColorList( props.guid )

		function confirmation() {
			generateStyles( themeStore.getFigmaColorList( props.guid ) )
			props.closeOverlay()
		}

		function cancellation() {
			props.closeOverlay()
		}

		return {
			name,
			colorList,
			cancellation,
			confirmation,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../../styles/mixins/fonts'
@use '../../../styles/mixins/colors'

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
	padding: 16px
	.modal
		background: colors.$modal-bg
		border-radius: 4px
		height: 98%
		min-height: 100px
		width: 100%
		max-width: 800px
		display: grid
		grid-template-rows: [header] 33px [body] 1fr [buttons] min-content
		.modal-header
			display: grid
			grid-row: header
			width: 100%
			grid-template-columns: [title] 1fr [close] 32px
			align-items: center
			border-bottom: 1px solid colors.$frame-border
			.title
				@include fonts.header
				grid-column: title
				padding: 0 0 0 16px
			.material-icons-outlined
				@include fonts.material-icons
				&.close-modal
					padding: 4px
					display: block
					background: colors.$action-icon-bg
					border-radius: 4px
					cursor: pointer
					height: 28px
					width: 28px
					grid-column: close
					justify-self: center
					&:hover
						background: colors.$action-icon-hover-bg
		.modal-body
			@include fonts.modal-message
			grid-row: body
			padding: 32px
			.modal-footer-notice
				margin: 32px 32px 0 32px
			h4
				margin: 24px 0
				padding: 0 0 8px 0
				border-bottom: 1px solid colors.$h1-border
		.modal-buttons
			display: grid
			grid-gap: 16px
			grid-row: buttons
			justify-items: right
			grid-template-columns: 1fr [cancel] auto [confirm] auto
			padding: 16px 32px
			border-top: 1px solid colors.$frame-border
			.button
				@include fonts.button
				padding: 8px 16px
				border-radius: 4px
				outline: none
				border: none
				background: colors.$button-bg
				border: 2px solid transparent
				cursor: pointer
				&.confirm
					grid-column: confirm
					color: colors.$button-success
					border-color: colors.$button-success
					&:not(:disabled)
						&:hover
							background: colors.$button-success
							color: colors.$button-hover-text
						&:active
							background: colors.$button-success-active
				&.danger
					grid-column: cancel
					color: colors.$button-danger
					border-color: colors.$button-danger
					&:not(:disabled)
						&:hover
							background: colors.$button-danger
							color: colors.$button-hover-text
						&:active
							background: colors.$button-danger-active
				&:disabled
					background: colors.$button-disabled
					color: colors.$button-disabled-text
					border-color: transparent
					cursor: not-allowed
</style>
