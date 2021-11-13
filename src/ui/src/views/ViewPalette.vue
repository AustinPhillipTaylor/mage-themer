
<template>
	<div class="view-palette">
		<div class="palette-name">
			<text-input
				v-model="name"
				id="paletteName"
				label="Palette Name"
				placeholder="Palette Name"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed, PropType } from 'vue'
import TextInput from '../components/form/TextInput.vue'
import { usePalettesStore } from '../stores/palettes'
import { Palette } from '../types/palette'

export default defineComponent( {
	components: {
		TextInput,
	},
	props: {
		guid: {
			type: String,
			required: true,
		},
	},
	setup( props ) {
		const paletteStore = usePalettesStore()
		const {
			name,
			colors,
		} = toRefs( paletteStore.palettes[props.guid] )

		return {
			name,
			colors,
		}
	},
} )
</script>

<style lang="sass" scoped>
.view-palette
	display: block
	width: 100%
	max-width: 800px
</style>
