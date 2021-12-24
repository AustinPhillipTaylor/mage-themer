<template>
	<div
		:class="[
			'theme-overview',
			{
				'errors': hasErrors
			}
		]"
	>
		<div
			class="details"
		>
			<div class="theme-title type--16 type--medium" > {{ theme.name || 'Untitled Theme' }} </div>
			<div class="theme-subtitle type--secondary">
				{{
					'Generates ' +
						(colorCount(theme.themePalette) * theme.variationMapping.length) +
						' colors'
				}}
			</div>
			<div class="palette-colors">
				<template v-if="paletteExists(theme.themePalette)">
					<template
						v-for="(color, guid) in colorList(theme.themePalette)"
						:key="guid"
					>
						<color-preview :rgb="color.rgb"/>
					</template>
				</template>
				<template v-else>
					Main palette not set.
				</template>
			</div>
			<div class="mixing-colors">
				<template v-if="paletteExists(theme.mixingPalette)">
					<template
						v-for="(color, guid) in colorList(theme.mixingPalette)"
						:key="guid"
					>
						<color-preview :rgb="color.rgb"/>
					</template>
				</template>
				<template v-else>
					Mixing palette not set.
				</template>
			</div>
		</div>
		<notice
			level="danger"
			class="error-notice"
			v-if="hasErrors"
		>
			There are errors with this theme which interfere with style generation.
			<ul>
				<li
					v-for="(item, index) in themeErrors"
					:key="index"
				>
					<template v-if="item === 1"> – Missing GUID (Likely an issue with an import file) </template>
					<template v-if="item === 2"> – Theme palette not set </template>
					<template v-if="item === 3"> – Theme palette does not exist </template>
					<template v-if="item === 4"> – Theme palette has no colors defined </template>
					<template v-if="item === 5"> – Mixing palette not set </template>
					<template v-if="item === 6"> – Mixing palette does not exist </template>
					<template v-if="item === 7"> – Mixing palette has no colors defined </template>
					<template v-if="item === 8"> – Name must be set </template>
					<template v-if="item === 9"> – Naming scheme must be set </template>
					<template v-if="item === 10"> – Theme must define color variations </template>
					<template v-if="item === 11"> – One or more color variations contain errors </template>
				</li>
			</ul>
		</notice>
		<div class="actions">
			<button
				class="button button--primary"
				@click="!hasErrors && generateThemeStyles( guid )"
				:disabled="hasErrors"
			>
				Preview Styles and Generate
			</button>
			<!-- <div class="action-button">Add Swatches to Canvas</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { usePalettesStore } from '@/stores/palettes'
import { useThemesStore } from '@/stores/themes'
import { Theme } from '@/types/Theme'
import { hexStringFromRGB } from '@/utils/hexStringFromRGB'
import Notice from '@/components/general/Notice.vue'
import ColorPreview from '@/components/general/ColorPreview.vue'

export default defineComponent( {
	components: {
		Notice,
		ColorPreview,
	},
	props: {
		theme:{
			type: Object as PropType<Theme>,
			required: true,
		},
		guid:{
			type: String,
			required: true,
		},
	},
	setup( props ) {

		const themeStore = useThemesStore()
		const themes = computed( () => themeStore.themes )
		const themesLength = computed( () => Object.keys( themes.value ).length )
		const themeErrors = themeStore.themeErrors( props.guid )
		const generateThemeStyles = themeStore.generateThemeStyles

		const paletteStore = usePalettesStore()
		const palettes = paletteStore.palettes

		const hasErrors = computed( () => {
			return themeErrors.length > 0
		} )

		function colorCount( guid: string ) {
			if( paletteExists( guid ) ) {
				return Object.keys( palettes[guid].colors ).length
			}
			return 0
		}

		function colorList( guid: string ) {
			if( paletteExists( guid ) ) {
				return palettes[guid].colors
			}
			return {}
		}

		function paletteExists( guid: string ) {
			if( palettes[guid] ) {
				return true
			}
			return false
		}

		return {
			themes,
			colorList,
			colorCount,
			paletteExists,
			hexStringFromRGB,
			themesLength,
			themeErrors,
			hasErrors,
			generateThemeStyles,
		}
	},
} )
</script>