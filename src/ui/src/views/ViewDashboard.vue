
<template>
	<div class="view-dashboard">
		<h1>Themes</h1>
		<template v-if="themesLength > 0">
			<template
				v-for="(theme, guid) in themes"
				:key="guid"
			>
				<theme-overview
					:theme="theme"
					:guid="(guid as string)"
				/>
			</template>
		</template>
		<template v-else>
			<div class="no-themes">
				<div class="icon">
					<span class="material-icons-outlined">
						sentiment_very_dissatisfied
					</span>
				</div>
				<h3 class="copy">
					No themes found
				</h3>
				<div class="info">
					Start creating a new theme using the add (+) icon in the top left.
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useThemesStore } from '../stores/themes'
import ThemeOverview from '../components/ThemeOverview.vue'

export default defineComponent( {
	components: {
		ThemeOverview,
	},
	setup() {

		const themeStore = useThemesStore()
		const themes = computed( () => themeStore.themes )
		const themesLength = computed( () => Object.keys( themes.value ).length )

		return {
			themes,
			themesLength,
		}
	},
} )
</script>

<style lang="sass" scoped>
@use '../styles/mixins/colors'
@use '../styles/mixins/fonts'

.view-dashboard
	display: block
	width: 100%
	max-width: 800px
	min-width: 450px
	h1
		margin: 24px 0
		padding: 0 0 8px 0
		border-bottom: 1px solid colors.$h1-border
	.action-button
		@include fonts.secondary-button
		display: block
		width: auto
		background: colors.$secondary-button-bg
		color: colors.$secondary-button-text
		border: 1px solid colors.$secondary-button-border
		height: auto
		white-space: nowrap
		padding: 8px 16px
		border-radius: 4px
		text-align: center
		cursor: pointer
		&:hover
			background: colors.$secondary-button-hover-bg
			color: colors.$secondary-button-hover-text
		&:active
			background: colors.$secondary-button-active-bg
	.no-themes
		display: grid
		justify-items: center
		text-align: center
		grid-gap: 16px
		margin: 64px 0
		.icon
			padding: 32px
			border-radius: 100%
			background: colors.$warning-light
			font-size: 0
			width: 60px
			height: 60px
			box-sizing: content-box
			.material-icons-outlined
				@include fonts.material-icons-extra-large
				color: colors.$warning
		.info
			@include fonts.sidebar-empty-guide
			display: block
			color: colors.$sidebar-label-text
			max-width: 250px
			text-align: center
</style>
