<template>
	<ul
		class="disclosure color-tree"
	>
		<li
			:class="[
				'disclosure__item',
				{
					'disclosure--expanded': isOpen
				}
			]"
			:key="currentKey"
		>
			<div
				class="disclosure__label disclosure--section group-name"
				@click.stop="toggleOpen()"
			>
				{{ currentKey }}
			</div> <!-- This item is styled as a section -->
			<div class="disclosure__content">
				<div
					class="group-contents"
				>
					<template v-if="hasStyles">
						<div class="style-item-group">
							<template
								v-for="(style, index) in colorTree.styles"
								:key="index"
							>
								<div
									class="style-item"
									:style="{
										background: hexStringFromRGB(style.color)
									}"
								>
									<div
										class="color-info"
										:style="{
											//@ts-ignore
											'--red': style.color.r,
											'--green': style.color.g,
											'--blue': style.color.b,
										}"
									>
										{{ style.name }} ( {{ hexStringFromRGB(style.color) }} )
									</div>
								</div>
							</template>
						</div>
					</template>
					<template
						v-if="hasSubPath"
					>
						<template
							v-for="(group, index) in subGroups"
							:key="index"
						>
							<color-list-tree
								:colorTree="group"
							/>
						</template>
					</template>
				</div>
			</div>
		</li>
	</ul>
</template>
<script lang="ts">
import { ColorGroup } from '@/types/ColorGroup'
import { defineComponent, computed, ref, Ref, PropType } from 'vue'
import { hexStringFromRGB } from '../../../utils/hexStringFromRGB'

export default defineComponent( {
	name: 'color-list-tree',
	props: {
		colorTree: {
			type: Object as PropType<ColorGroup>,
			required: true,
		},
	},
	setup( props ) {
		const isOpen = ref( true )

		const currentKey = props.colorTree.groupName || 'Style Group(s)'

		const hasStyles = computed( () => {
			if( props.colorTree.styles.length > 0 ) {
				return true
			}
			return false
		} )

		const subGroups = ref( props.colorTree.subGroups )

		const hasSubPath = computed( () => {
			if( subGroups.value.length > 0 ) {
				return true
			}
			return false
		} )

		function toggleOpen() {
			isOpen.value = !isOpen.value
		}

		return {
			hexStringFromRGB,
			subGroups,
			hasSubPath,
			toggleOpen,
			currentKey,
			hasStyles,
			isOpen,
		}
	},
} )
</script>