<template>
	<div
		class="import-export"
		tabindex="0"
		@blur="isOpen = false"
		@click="isOpen = !isOpen"
	>
		<div class="import-export-button">
			Import / Export
			<div
				:class="['options', { 'open': isOpen }]"
			>
				<span @click="openFileBrowser" >
					Import from JSON file
					<input
						type="file"
						accept="application/json"
						class="file-input"
						ref="fileInput"
						@change="handleUpload"
					>
				</span>
				<span @click="downloadJSON" > Export to JSON file </span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import exp from 'constants'
import { defineComponent, ref, Ref } from 'vue'
import { useAppStore } from '../../stores/app'
import { usePalettesStore } from '../../stores/palettes'
import { useThemesStore } from '../../stores/themes'

export default defineComponent( {
	setup() {

		const paletteStore = usePalettesStore()
		const themeStore = useThemesStore()

		const isOpen = ref( false )
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
			isOpen,
			fileInput,
			handleUpload,
			openFileBrowser,
			downloadJSON,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../../styles/mixins/fonts'
@use '../../styles/mixins/colors'

.import-export
	user-select: none
	width: auto
	height: 100%
	display: grid
	align-items: center
	justify-self: left
	.file-input
		display: none
	.import-export-button
		@include fonts.header-import-export
		position: relative
		padding: 4px 8px
		background: colors.$action-icon-bg
		border-radius: 4px
		z-index: 999
		.material-icons-outlined
			@include fonts.material-icons
		&:hover
			background: colors.$action-icon-hover-bg
			cursor: pointer
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
