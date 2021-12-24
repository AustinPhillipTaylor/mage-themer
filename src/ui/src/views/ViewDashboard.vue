
<template>
	<div class="view-wrapper view-dashboard">
		<div class="dashboard-heading type--24 type--medium type--divider">Themes</div>
		<template v-if="themesLength > 0">
			<div class="theme-overview-list">
				<template
					v-for="(theme, guid) in themes"
					:key="guid"
				>
					<theme-overview
						:theme="theme"
						:guid="(guid as string)"
					/>
				</template>
			</div>
		</template>
		<template v-else>
			<div class="no-themes">
				<div class="section-wrapper">
					<div class="no-items-card">
						<div class="no-items-icon">
							<div class="icon icon--dead"></div>
						</div>
						<div class="no-items-copy">
							<span class="no-items-title type--medium" >No themes found</span>
							<span class="no-items-guide" >You can create new themes using the add (+) icon in the top left. Or click the button below.</span>
						</div>
					</div>
				</div>
				<div class="section-wrapper create-theme">
					<button
						class="button button--secondary"
						@click="addTheme"
					>Create Your First Theme</button>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useThemesStore } from '@/stores/themes'
import ThemeOverview from '@/components/ThemeOverview.vue'

export default defineComponent( {
	components: {
		ThemeOverview,
	},
	setup() {

		const themeStore = useThemesStore()
		const themes = computed( () => themeStore.themes )
		const themesLength = computed( () => Object.keys( themes.value ).length )
		const { addTheme } = themeStore

		return {
			themes,
			themesLength,
			addTheme,
		}
	},
} )
</script>