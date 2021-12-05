<template>
	<div
		:class="[ 'block-notice', level ]"
	>

		<div class="icon">
			<div
				v-if="level === 'success'"
				class="success-icon"
			>
				<span class="material-icons-outlined">
					done
				</span>
			</div>
			<div
				v-else-if="level === 'warning'"
				class="warning-icon"
			>
				<span class="material-icons-outlined">
					priority_high
				</span>
			</div>
			<div
				v-else-if="level === 'danger'"
				class="danger-icon"
			>
				<span class="material-icons-outlined">
					close
				</span>
			</div>
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

export default defineComponent( {
	props: {
		level: {
			type: String as PropType<'danger' | 'warning' | 'success'>,
			required: false,
			default: 'warning',
		},
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

$icon-size: 32px

.block-notice
	@include fonts.notice
	display: grid
	width: auto
	padding: 16px 64px 16px 16px
	border: 2px solid transparent
	min-height: 32px
	border-radius: 4px
	background: transparent
	grid-template-columns: 32px 1fr
	grid-gap: 16px
	&.danger
		background: colors.$danger-light
		border-color: colors.$danger
		color: colors.$danger-dark
	&.warning
		background: colors.$warning-light
		border-color: colors.$warning
		color: colors.$warning-dark
	&.success
		background: colors.$success-light
		border-color: colors.$success
		color: colors.$success-dark
	.icon
		div
			display: grid
			justify-content: center
			align-content:  center
			width: $icon-size
			height: $icon-size
			position: relative
			border-radius: 50%
			padding-left: 1px
			border: 2px solid transparent
			background: transparent
			span
				@include fonts.notice-material-icon
			&.success-icon
				border-color: colors.$success
				span
					color: colors.$success
			&.warning-icon
				border-color: colors.$warning
				span
					color: colors.$warning
			&.danger-icon
				border-color: colors.$danger
				span
					color: colors.$danger
</style>
