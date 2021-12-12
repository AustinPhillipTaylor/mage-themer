<template>
	<button-with-menu
		:options="[{
				text: 'Add new theme',
				callback: addTheme
			},
			{
				text: 'Add new palette',
				callback: addPalette
			}]"
		:menu-margin="8"
	>
		<template #display>
			<header-button :chevron="true">
				<div class="icon icon--plus" />
			</header-button>
		</template>
	</button-with-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePalettesStore } from '../../stores/palettes'
import { useThemesStore } from '../../stores/themes'
import ButtonWithMenu from '../general/ButtonWithMenu.vue'
import HeaderButton from './HeaderButton.vue'

export default defineComponent( {
	components: {
		ButtonWithMenu,
		HeaderButton,
	},
	setup() {
		const themeStore = useThemesStore()
		const paletteStore = usePalettesStore()
		const { addTheme } = themeStore
		const { addPalette } = paletteStore

		return {
			addTheme,
			addPalette,
		}
	},
} )
</script>