<template>
	<div class="modal-wrapper" >
		<div class="modal">
			<div class="modal-header">
				<div class="title">
					Loading and checking file compatibility
				</div>
				<div
					class="material-icons-outlined close-modal"
					@click="() => closeOverlay()"
				>
					close
				</div>
			</div>
			<div class="modal-body">
				<template
					v-for="(step, name) in steps"
					:key="name"
				>
					<import-step
						:done="step.done"
						:failed="step.failed"
						:interrupted="status.failed && !step.done && !step.failed"
						:waiting-text="step.waitingText"
						:done-text="step.doneText"
						:failed-text="step.failedText"
						:interrupted-text="step.interruptedText"
					/>
				</template>
			</div>
			<div class="modal-buttons">
				<button
					class="button danger"
					@click="cancelImport"
				>
					Cancel Import
				</button>
				<button
					class="button confirm"
					:disabled="!status.ready || status.failed"
				>
					Finish Import
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ImportStep from './ImportStep.vue'
import { parsingJSON, checkingPalettes, checkingThemes } from './importSteps'

export default defineComponent( {
	components: {
		ImportStep,
	},
	props: {
		file: {
			type: File,
			required: true,
		},
		closeOverlay: {
			type: Function,
			required: true,
		},
	},
	setup( props ) {

		const status = ref( {
			ready: false,
			failed: false,
			canceled: false,
		} )



		const steps = ref( {
			resolve: {
				waitingText: 'Waiting for file to upload.',
				doneText: 'File successfully loaded!',
				failedText: 'Something went wrong, file could not be loaded.',
				interruptedText: 'File loading interrupted.',
				done: false,
				failed: false,
			},
			parse: {
				waitingText: 'Waiting to read file.',
				doneText: 'File successfully read!',
				failedText: 'File could not be read. Not in JSON format.',
				interruptedText: 'File reading interrupted.',
				done: false,
				failed: false,
			},
			resolvePalettes: {
				waitingText: 'Waiting to check palette compatibility.',
				doneText: 'Palette check successful!',
				failedText: 'Palettes could not be resolved.',
				interruptedText: 'Palettes compatibility check interrupted.',
				done: false,
				failed: false,
			},
			resolveThemes: {
				waitingText: 'Waiting to check theme compatibility.',
				doneText: 'Theme check successful!',
				failedText: 'Themes could not be resolved.',
				interruptedText: 'Themes compatibility check interrupted.',
				done: false,
				failed: false,
			},
		} )

		onMounted( () => {
			if( !props.file || !( props.file instanceof Blob ) ) {
				steps.value.resolve.failed = true
				status.value.failed = true
				return false
			}
			props.file
				.text()
				.then( ( rawText ) => {
					steps.value.resolve.done = true
					return parsingJSON( status.value.canceled, rawText )
				} )
				.then( ( parsedJSON ) => {
					steps.value.parse.done = true
					return checkingPalettes( status.value.canceled, parsedJSON )
				} )
				.then( ( parsedJSON ) => {
					steps.value.resolvePalettes.done = true
					return checkingThemes( status.value.canceled, parsedJSON )
				} )
				.then( () => {
					steps.value.resolveThemes.done = true
					status.value.ready = true
					return true
				} )
				.catch( ( failurePoint ) => {
					status.value.failed = true
					switch( failurePoint ) {
						case 'parsingJSON':
							steps.value.parse.failed = true
							break
						case 'checkingPalettes':
							steps.value.resolvePalettes.failed = true
							break
						case 'checkingThemes':
							steps.value.resolveThemes.failed = true
							break
						default:
							// Do Nothing
					}
				} )
		} )

		function cancelImport() {
			status.value.canceled = true
			props.closeOverlay()
		}

		return {
			steps,
			status,
			cancelImport,
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
		height: auto
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
			grid-row: body
			padding: 32px 0
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
