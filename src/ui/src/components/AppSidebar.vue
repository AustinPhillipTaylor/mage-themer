<template>
	<div class="sidebar" >
		<div class="section-label"> Themes </div>
		<div
			v-if="Object.keys(themes).length < 1"
			class="no-items-notice"
		> No Themes. Create one to get started. </div>
		<ul
			v-else
			class="themes"
		>
			<li
				v-for="(theme, guid) in themes"
				:key="guid"
				:class="['sidebar-button', { 'current': selected === guid as string }]"
				@click="setAppView( 'theme', `Theme - ${theme.name}`, theme )"
			>
				{{ theme.name }}
			</li>
		</ul>
		<div class="section-label"> Palettes </div>
		<div
			v-if="Object.keys(palettes).length < 1"
			class="no-items-notice"
		> No Palettes. Create one to get started. </div>
		<ul
			v-else
			class="palettes"
		>
			<li
				v-for="(palette, guid) in palettes"
				:key="guid"
				:class="['sidebar-button', { 'current': selected === guid as string }]"
				@click="setAppView( 'theme', `Palette - ${palette.name}`, palette )"
			>
				{{ palette.name }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import ViewPalette from '../views/ViewPalette.vue'
import ViewTheme from '../views/ViewTheme.vue'
import { Palette, Palettes } from '../types/palette'
import { Theme, Themes } from '../types/theme'
import { AppView } from '../types/AppView'

export default defineComponent( {
	props: {
		themes: {
			type: Object as PropType<Themes>,
			default: () => ( {} ),
			required: false,
		},
		palettes: {
			type: Object as PropType<Palettes>,
			default: () => ( {} ),
			required: false,
		},
		selected: {
			type: String,
			required: false,
		},
	},
	emits: [ 'setAppView' ],
	setup( props, { emit } ) {

		function setAppView( type: 'palette' | 'theme', header: string, data: Palette | Theme ) {
			const view: AppView = {
				component: () => {
					if( type === 'palette' ) return ViewPalette
					if( type === 'theme' ) return ViewTheme
					return {}
				},
				header,
				viewProps: data,
			}
			emit( 'setAppView', view )
		}

		return {
			setAppView,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts'
@use '../styles/mixins/colors'

.sidebar
	@include fonts.font-sidebar
	overflow-y: auto
	border-right: 1px solid colors.$sidebar-border
	padding: 8px
	background: colors.$sidebar-background
	color: colors.$sidebar-link-text
	min-height: calc(100% - 1px) // Subtract 1px because theres an odd overflow in Figma's iframe
	.section-label
		@include fonts.font-sidebar-label
		width: auto
		height: auto
		color: colors.$sidebar-label-text
		border-bottom: 1px solid colors.$sidebar-label-border
		margin: 0 8px 4px 8px
		padding: 24px 2px 4px 2px
		display: block
		&:nth-child(1)
			padding-top: 8px
	ul
		li
			&.sidebar-button
				text-align: left
				padding: 8px 12px
				border-radius: 4px
				background: transparent
				width: auto
				display: block
				margin: 4px 0
				border: none
				outline: none
				&:hover,
				&.current
					color: colors.$sidebar-link-text-hover
					cursor: pointer
					background: colors.$sidebar-link-hover-bg
					border: 1px solid colors.$sidebar-border
					padding: 7px 11px
				&:active
					color: colors.$sidebar-link-text-active
					background: colors.$sidebar-link-active-bg
</style>
