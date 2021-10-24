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
				@click="setView(theme)"
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
				@click="setView(palette)"
			>
				{{ palette.name }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { Palettes } from '../types/palette'
import { Themes } from '../types/theme'

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
	emits: [ 'setView' ],
	setup( props, { emit } ) {

		function setView( view: any ) {
			 emit( 'setView', view )
		}

		return {
			setView,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/fonts' as fonts

.sidebar
	@include fonts.font-sidebar
	overflow-y: auto
	border-right: 1px solid #E9EDF0
	padding: 12px
	.section-label
		@include fonts.font-sidebar-label
		width: 100%
		height: auto
		color: #797B7E
		border-bottom: 1px solid #BDBFC4
		margin: 0 0 8px 0
		padding: 24px 0 2px 0
		&:nth-child(1)
			padding-top: 8px
	ul
		li
			&.sidebar-button
				text-align: left
				padding: 6px
				border-radius: 4px
				background: transparent
				width: 100%
				display: block
				margin: 8px 0
				border: none
				outline: none
				font-weight: 500
				&:hover,
				&.current
					cursor: pointer
					background: #F1F5F9
				&:active
					background: #e8ecf1
</style>
