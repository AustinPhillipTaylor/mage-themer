<template>
	<div
		class="modal-wrapper"
		tabindex="-1"
		ref="modalWrapper"
		@keyup.esc="cancellation"
	>
		<div class="modal">
			<div class="modal-header">
				<div class="title type type--bold">
					{{ title }}
				</div>
				<icon-button
					class="close-modal"
					type="close"
					@click="cancellation"
				></icon-button>
			</div>
			<perfect-scrollbar class="modal-body">
				<div>
					{{ message }}
				</div>
			</perfect-scrollbar>
			<div class="modal-buttons">
				<Button
					ref="modalCancel"
					type="secondary"
					@click="cancellation"
					@keyup.enter="cancellation"
				>
					{{ buttons.cancel?.text || 'Cancel' }}
				</Button>
				<Button
					ref="modalConfirm"
					type="primary"
					@click="confirmation"
					@keyup.enter="confirmation"
				>
					{{ buttons.confirm.text || 'Confirm' }}
				</Button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref, PropType } from 'vue'
import { ConfirmationModalButtons } from '../../types/ConfirmationModalButtons'
import IconButton from '../general/IconButton.vue'
import Button from '../general/Button.vue'

export default defineComponent( {
	components: {
		IconButton,
		Button,
	},
	props: {
		closeOverlay: {
			type: Function,
			required: true,
		},
		title: {
			type: String,
			required: false,
			default: 'Confirm?',
		},
		message: {
			type: String,
			required: true,
		},
		buttons: {
			type: Object as PropType<ConfirmationModalButtons>,
			required: true,
		},
	},
	setup( props ) {

		const modalWrapper: Ref<HTMLElement | null> = ref( null )
		const modalCancel: Ref<{ button: HTMLElement } | null> = ref( null )
		const modalConfirm: Ref<{ button: HTMLElement } | null> = ref( null )

		onMounted( () => {
			// Add focus to entire modal upon first enter
			modalConfirm.value?.button.focus()
		} )


		function confirmation() {
			props.buttons.confirm.callback()
			props.closeOverlay()
		}

		function cancellation() {
			if( props.buttons.cancel?.callback ) {
				props.buttons.cancel.callback()
			}
			props.closeOverlay()
		}

		return {
			cancellation,
			confirmation,
			modalWrapper,
			modalCancel,
			modalConfirm,
		}
	},
} )
</script>