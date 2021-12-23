<template>
	<div class="modal-wrapper" >
		<div class="modal">
			<div class="modal-header">
				<div class="title type type--bold">
					Loading and checking file compatibility
				</div>
				<icon-button
					class="close-modal"
					type="close"
					@click="cancelImport"
				></icon-button>
			</div>
			<perfect-scrollbar class="modal-body">
				<div>
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
					<notice
						level="warning"
						class="modal-footer-notice"
						v-if="status.conflicts"
					>
						Duplicate palettes or themes detected. Clicking 'Finish Import' will overwrite any conflicting items, this is not reversible. To avoid data loss, we recommend exporting your current data before importing this file.
					</notice>
				</div>
			</perfect-scrollbar>
			<div class="modal-buttons">
				<Button
					type="secondary"
					@click="cancelImport"
				>
					Cancel Import
				</Button>
				<Button
					type="primary"
					@click="completeImport"
					:disabled="!status.ready || status.failed"
				>
					Finish Import
				</Button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import IconButton from '@/components/general/IconButton.vue'
import Button from '@/components/general/Button.vue'
import ImportStep from './ImportStep.vue'
import { parsingJSON, checkingPalettes, checkingThemes, hasConflicts } from './importSteps'
import Notice from '@/components/general/Notice.vue'
import { usePalettesStore } from '@/stores/palettes'
import { useThemesStore } from '@/stores/themes'
import { Palettes } from '@/types/Palette'
import { Themes } from '@/types/Theme'


export default defineComponent( {
	components: {
		ImportStep,
		Notice,
		IconButton,
		Button,
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

		const paletteStore = usePalettesStore()
		const themeStore = useThemesStore()

		const status = ref( {
			ready: false,
			failed: false,
			canceled: false,
			conflicts: false,
		} )

		const uploadedJSON: Ref<{ palettes: Palettes; themes: Themes } | null> = ref( null )

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
				.then( ( parsedJSON ) => {
					uploadedJSON.value = parsedJSON
					if( hasConflicts( parsedJSON, paletteStore.palettes, themeStore.themes ) ) {
						status.value.conflicts = true
					}
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

		function completeImport() {
			if( uploadedJSON.value?.palettes ) {
				paletteStore.importPalettes( uploadedJSON.value.palettes )
			}
			if( uploadedJSON.value?.themes ) {
				themeStore.importThemes( uploadedJSON.value.themes )
			}
			props.closeOverlay()
		}

		function cancelImport() {
			status.value.canceled = true
			props.closeOverlay()
		}

		return {
			steps,
			status,
			cancelImport,
			completeImport,
		}
	},
} )
</script>