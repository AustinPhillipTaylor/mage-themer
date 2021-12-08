<template>
	<div class="color-list" >
		<div
			class="group-name"
			@click="toggleOpen()"
		>
			<div
				:class="[
					'material-icons-outlined',
					'expand-more',
					{
						'expanded': isOpen
					}
				]"
			>
				expand_more
			</div>
			<span>{{ currentKey }}</span>
		</div>

		<div
			class="group-contents"
			v-show="isOpen"
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
								{{ style.name }} ({{ hexStringFromRGB(style.rgb) }})
							</div>
						</div>
					</template>
				</div>
			</template>
			<div
				v-if="hasSubPath"
			>
				<template
					v-for="(subPath, index) in subPaths"
					:key="index"
				>
					<color-list-tree
						:colorList="{ [index]: subPath }"
					/>
				</template>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, Ref, PropType } from 'vue'
import { hexStringFromRGB } from '../../../utils/hexStringFromRGB'

export default defineComponent( {
	name: 'color-list-tree',
	props: {
		colorList: {
			type: Object,
			required: true,
		},
	},
	setup( props ) {

		const isOpen = ref( true )

		const currentKey = Object.keys( props.colorList )[0]
		const currentList = ref( props.colorList[currentKey] )

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

<style lang="sass" scoped>
@use '../../../styles/mixins/fonts'
@use '../../../styles/mixins/colors'

.color-list
	.group-name
		@include fonts.color-list-tree-items
		display: block
		width: 100%
		background: colors.$gray-10
		padding: 8px 16px
		border-radius: 4px
		cursor: pointer
		margin: 0 0 4px 0
		line-height: 100%
		vertical-align: middle
		&:hover
			background: colors.$action-icon-hover-bg
		span
			vertical-align: middle
		.material-icons-outlined
			@include fonts.material-icons
			&.expand-more
				padding: 4px
				display: inline-block
				background: transparent
				height: 28px
				width: 28px
				vertical-align: middle
				&.expanded
					transform: rotate(180deg)
	.group-contents
		display: block
		width: 100%
		padding: 0 0 0 16px
		border-radius: 4px
		cursor: pointer
		margin: 0 0 4px 0
		.style-item-group
			width: 100%
			display: grid
			grid-gap: 8px
			grid-template-columns: repeat(2, 1fr)
			padding: 16px 0
			.style-item
				border-radius: 4px
				padding: 8px 16px
				.color-info
					@include fonts.color-list-tree-items
					--threshold: 0.5
					--r: calc(var(--red) * 0.299)
					--g: calc(var(--green) * 0.587)
					--b: calc(var(--blue) * 0.114)
					--sum: calc(var(--r) + var(--g) + var(--b))
					--perceived-lightness: calc(var(--sum) / 255)
					color: hsl(0, 0%, calc((var(--perceived-lightness) - var(--threshold)) * -10000000%))
</style>
