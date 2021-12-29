<template>
	<ul
		class="color-list"
	>
		<div class="style-item-group">
			<template
				v-for="(item, index) in colorList"
				:key="index"
			>
				<div
					class="style-item"
					:style="{
						background: hexStringFromRGB( item.color )
					}"
				>
					<div
						class="color-info"
						:style="{
							//@ts-ignore
							'--red': item.color.r,
							'--green': item.color.g,
							'--blue': item.color.b,
						}"
					>
						{{ item.name.split('/').join(' / ') }} ( {{ hexStringFromRGB(item.color) }} )
					</div>
				</div>
			</template>
		</div>
	</ul>
</template>
<script lang="ts">
import { ColorStyle } from '@/types/ColorStyle'
import { defineComponent, computed, ref, Ref, PropType } from 'vue'
import { hexStringFromRGB } from '../../../utils/hexStringFromRGB'

export default defineComponent( {
	name: 'color-list-display',
	props: {
		colorList: {
			type: Array as PropType<ColorStyle[]>,
			required: true,
		},
	},
	setup( props ) {
		return {
			hexStringFromRGB,
		}
	},
} )
</script>