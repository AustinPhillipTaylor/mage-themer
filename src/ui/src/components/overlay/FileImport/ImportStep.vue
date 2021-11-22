<template>
	<div class="import-step" >

		<div class="icon">
			<div
				v-if="!done && !failed && !interrupted"
				class="waiting-icon"
			></div>
			<div
				v-else-if="done"
				class="success-icon"
			>
				<span class="material-icons-outlined">
					done
				</span>
			</div>
			<div
				v-else-if="failed"
				class="failed-icon"
			>
				<span class="material-icons-outlined">
					close
				</span>
			</div>
			<div
				v-else-if="interrupted"
				class="interrupted-icon"
			>
				<span class="material-icons-outlined">
					error_outline
				</span>
			</div>
		</div>
		<div class="text">
			<div
				v-if="!done && !failed && !interrupted"
				class="waiting-text"
			>
				{{ waitingText }}
			</div>
			<div
				v-else-if="done"
				class="success-text"
			>
				{{ doneText }}
			</div>
			<div
				v-else-if="failed"
				class="failed-text"
			>
				{{ failedText }}
			</div>
			<div
				v-else-if="interrupted"
				class="interrupted-text"
			>
				{{ interruptedText }}
			</div>
		</div>


	</div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref, watch, Ref, WatchStopHandle, computed, PropType } from 'vue'

export default defineComponent( {
	props: {
		done: {
			type: Boolean,
			required: true,
			default: false,
		},
		failed: {
			type: Boolean,
			required: true,
			default: false,
		},
		interrupted: {
			type: Boolean,
			required: true,
			default: false,
		},
		waitingText: {
			type: String,
			required: true,
		},
		doneText: {
			type: String,
			required: true,
		},
		failedText: {
			type: String,
			required: true,
		},
		interruptedText: {
			type: String,
			required: true,
		},
	},
	setup( props ) {


		return {
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../../styles/mixins/fonts'
@use '../../../styles/mixins/colors'
@use 'sass:math'


@keyframes spinner
	from
		transform: rotate(0deg)
	to
		transform: rotate(360deg)

$icon-size: 32px

.import-step
	@include fonts.import-export-step
	display: grid
	padding: 0 32px
	grid-gap: 16px
	grid-template-columns: 75px 1fr
	grid-template-rows: minmax(75px, auto)
	align-items: center
	.icon
		justify-self: center
		div
			display: grid
			justify-content: center
			align-content:  center
			width: $icon-size
			height: $icon-size
			position: relative
			&.waiting-icon
				&:before
					content: ''
					position: absolute
					top: 0
					left: 0
					box-sizing: border-box
					width: 100%
					height: 100%
					border-radius: 50%
					border-top: 3px solid colors.$main-dark
					border-right: 3px solid transparent
					animation: spinner .6s linear infinite
			&.success-icon
				border-radius: 50%
				background: colors.$icon-success-bg
				span
					color: colors.$icon-success-text
			&.failed-icon
				border-radius: 50%
				background: colors.$icon-danger-bg
				span
					color: colors.$icon-danger-text
			&.interrupted-icon
				border-radius: 50%
				background: colors.$icon-neutral-bg
				span
					color: colors.$icon-neutral-text

</style>
