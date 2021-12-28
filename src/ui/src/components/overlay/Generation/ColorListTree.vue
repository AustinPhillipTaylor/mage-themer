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
								v-for="(style, index) in currentList.styles"
								:key="index"
							>
								<div
									class="style-item"
									:style="{
										background: hexStringFromRGB(style.rgb)
									}"
								>
									<div
										class="color-info"
										:style="{
											//@ts-ignore
											'--red': style.rgb.r,
											'--green': style.rgb.g,
											'--blue': style.rgb.b,
										}"
									>
										{{ style.name }} ( {{ hexStringFromRGB(style.rgb) }} )
									</div>
								</div>
							</template>
						</div>
					</template>
					<template
						v-if="hasSubPath"
					>
						<template
							v-for="(subPath, index) in subPaths"
							:key="index"
						>
							<color-list-tree
								:colorTree="{ [index]: subPath }"
							/>
						</template>
					</template>
				</div>
			</div>
		</li>
	</ul>
</template>
<script lang="ts">
import { defineComponent, computed, ref, Ref, PropType } from 'vue'
import { hexStringFromRGB } from '../../../utils/hexStringFromRGB'

export default defineComponent( {
	name: 'color-list-tree',
	props: {
		colorTree: {
			type: Object,
			required: true,
		},
	},
	setup( props ) {

		const isOpen = ref( true )

		const currentKey = Object.keys( props.colorTree )[0]
		const currentList = ref( props.colorTree[currentKey] )

		const hasStyles = computed( () => {
			if( currentList.value.styles && currentList.value.styles.length > 0 ) {
				return true
			}
			return false
		} )

		const subPaths = computed( () => {
			const pathList = Object.keys( currentList.value )
			// Check for styles key and
			// Check that it's an array and not just a path named 'styles'
			if( pathList.includes( 'styles' ) && currentList.value.styles.length ) {
				pathList.splice( pathList.indexOf( 'styles' ), 1 )
			}
			if( pathList.length > 0 ) {
				const paths: any = {}
				for( const path of pathList ) {
					paths[path] = currentList.value[path]
				}
				return paths
			}
			return false
		} )

		const hasSubPath = computed( () => {
			if( Object.keys( subPaths.value ).length > 0 ) {
				return true
			}
			return false
		} )

		function toggleOpen() {
			isOpen.value = !isOpen.value
		}

		return {
			hexStringFromRGB,
			subPaths,
			hasSubPath,
			toggleOpen,
			currentKey,
			currentList,
			hasStyles,
			isOpen,
		}
	},
} )
</script>