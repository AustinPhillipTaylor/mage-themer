<template>
	<div class="sidebar-area" >
		<perfect-scrollbar>
			<div class="section-label"> General </div>
			<ul class="dashboard" >
				<li
					:class="['sidebar-button', { 'current type--medium': viewType === 'dashboard' }]"
					@click="setAppView( 'dashboard' )"
				>
					<div class="icon icon--check"></div>
					<span class="sidebar-button-text">Dashboard</span>
				</li>
				<li
					:class="['sidebar-button', { 'current type--medium': viewType === 'help' }]"
					@click="setAppView( 'help' )"
				>
					<div class="icon icon--check"></div>
					<span class="sidebar-button-text">Help</span>
				</li>
			</ul>

			<div class="section-label"> Themes </div>
			<div
				v-if="Object.keys(themes).length < 1"
				class="no-items-card"
			>
				<div class="no-items-icon">
					<div class="icon icon--theme"></div>
				</div>
				<div class="no-items-copy">
					<span class="no-items-title type--medium" >No themes found</span>
					<span class="no-items-guide" >Start creating a new theme using the add (+) icon in the top left.</span>
				</div>
			</div>
			<ul
				v-else
				class="themes"
			>
				<li
					v-for="(theme, guid) in themes"
					:key="guid"
					:class="['sidebar-button', { 'current type--medium': currentGUID === guid as string }]"
					@click="setAppView( 'theme', theme.name, guid as string )"
				>
					<div class="icon icon--check"></div>
					<span class="sidebar-button-text">{{ theme.name || 'Untitled Theme' }}</span>

					<with-simple-tooltip :horizontalMargin="8">
						<template #contents>
							<div
								class="icon-button icon--red delete-item"
								@click.stop="() => deleteTheme( guid as string )"
							>
								<div class="icon icon--trash"></div>
							</div>
						</template>
						<template #tooltip>
							Delete Theme
						</template>
					</with-simple-tooltip>
				</li>
			</ul>
			<div class="section-label"> Palettes </div>
			<div
				v-if="Object.keys(palettes).length < 1"
				class="no-items-card"
			>
				<div class="no-items-icon">
					<div class="icon icon--blend-empty"></div>
				</div>
				<div class="no-items-copy">
					<span class="no-items-title type--medium" >No palettes found</span>
					<span class="no-items-guide" >Start creating a new palette using the add (+) icon in the top left.</span>
				</div>
			</div>
			<ul
				v-else
				class="palettes"
			>
				<li
					v-for="(palette, guid) in palettes"
					:key="guid"
					:class="['sidebar-button', { 'current type--medium': currentGUID === guid as string }]"
					@click="setAppView( 'palette', palette.name, guid as string )"
				>
					<div class="icon icon--check"></div>
					<span class="sidebar-button-text">{{ palette.name || 'Untitled Palette' }}</span>
					<with-simple-tooltip :horizontalMargin="8">
						<template #contents>
							<div
								class="icon-button icon--red delete-item"
								@click.stop="() => deletePalette( guid as string )"
							>
								<div class="icon icon--trash"></div>
							</div>
						</template>
						<template #tooltip>
							Delete Palette
						</template>
					</with-simple-tooltip>
				</li>
			</ul>
		</perfect-scrollbar>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'
import { usePalettesStore } from '../stores/palettes'
import { useThemesStore } from '../stores/themes'
import { storeToRefs } from 'pinia'
import WithSimpleTooltip from '@/components/general/WithSimpleTooltip.vue'

export default defineComponent( {
	components: {
		WithSimpleTooltip,
	},
	setup() {
		const appStore = useAppStore()
		const { setAppView } = appStore
		const { guid: currentGUID, viewType } = storeToRefs( appStore )

		const paletteStore = usePalettesStore()
		const { palettes } = storeToRefs( paletteStore )

		const themeStore = useThemesStore()
		const { themes } = storeToRefs( themeStore )

		function deleteTheme( guid: string ) {
			themeStore.deleteTheme( guid )
		}

		function deletePalette( guid: string ) {
			paletteStore.deletePalette( guid )
		}

		return {
			setAppView,
			currentGUID,
			viewType,
			palettes,
			themes,
			deleteTheme,
			deletePalette,
		}
	},
} )
</script>