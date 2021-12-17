<template>
	<input
		type="file"
		accept="application/json"
		class="file-input"
		ref="fileInput"
		:style="{
			display: 'none'
		}"
		@change="handleUpload"
	>
	<button-with-menu
		:options="[{
				text: 'Import from JSON file',
				callback: openFileBrowser
			},
			{
				text: 'Export to JSON file',
				callback: downloadJSON
			}]"
		:menu-margin="8"
	>
		<template #display>
			<contained-button :chevron="true">
				<span class="type type--large type--medium">Import / Export</span>
			</contained-button>
		</template>
	</button-with-menu>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { usePalettesStore } from '@/stores/palettes'
import { useThemesStore } from '@/stores/themes'
import ButtonWithMenu from '@/components/general/ButtonWithMenu.vue'
import ContainedButton from '@/components/general/ContainedButton.vue'

export default defineComponent( {
	components: {
		ButtonWithMenu,
		ContainedButton,
	},
	setup() {

		const paletteStore = usePalettesStore()
		const themeStore = useThemesStore()

		const fileInput: Ref<HTMLInputElement | null> = ref( null )
		const appStore = useAppStore()

		function handleUpload( e: Event ) {
			appStore.setOverlay( 'file-import', {
				file: fileInput.value?.files?.[0],
			} )
			/**
			 * Reset file picker value.
			 * If we don't do this, closing the modal and then selecting
			 * the same file again will not trigger the change event.
			 */
			;( <HTMLInputElement>fileInput.value ).value = ''
		}

		function openFileBrowser() {
			if( fileInput.value ) {
				fileInput.value.click()
			}
		}

		function download( data: any, filename: string, type: string ) {
			const file = new Blob( [ data ], { type: type } )
			const a = document.createElement( 'a' )
			const url = URL.createObjectURL( file )
			a.href = url
			a.download = filename
			document.body.appendChild( a )
			a.click()
			setTimeout( function() {
				document.body.removeChild( a )
				window.URL.revokeObjectURL( url )
			}, 10 )
		}

		function downloadJSON() {
			const exportData = {
				palettes: {
					...paletteStore.palettes,
				},
				themes: {
					...themeStore.themes,
				},
			}
			const jsonString = JSON.stringify( exportData )

			download( jsonString, 'styleGen.json', 'application/json' )
		}

		return {
			fileInput,
			handleUpload,
			openFileBrowser,
			downloadJSON,
		}
	},
} )
</script>