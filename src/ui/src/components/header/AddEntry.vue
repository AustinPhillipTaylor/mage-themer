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
			<contained-button :chevron="true">
				<div class="icon icon--plus" />
			</contained-button>
		</template>
	</button-with-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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