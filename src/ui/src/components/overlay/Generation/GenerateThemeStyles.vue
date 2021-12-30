<template>
	<div
		class="theme-generation-preview modal-wrapper"
		tabindex="-1"
		ref="modalWrapper"
		@keyup.esc="cancellation"
	>
		<div class="modal">
			<div class="modal-header">
				<div class="title type type--bold">
					{{ title }}
				</div>
				<icon-button
					class="close-modal"
					type="close"
					@click="cancellation"
				></icon-button>
			</div>
			<perfect-scrollbar class="modal-body">
				<div class="type--medium type--divider title-with-buttons">
					<span>Theme Preview - {{ name }}</span>
					<div class="display-change-icons">
						<with-simple-tooltip :horizontalMargin="8">
							<template #contents>
								<icon-button
									:class="[{
										'icon-button--secondary-selected': viewType === 'group'
									}]"
									type="folder"
									@click="setViewType('group')"
								></icon-button>
							</template>
							<template #tooltip>
								Display as collapsible groups
							</template>
						</with-simple-tooltip>
						<with-simple-tooltip :horizontalMargin="8">
							<template #contents>
								<icon-button
									:class="[{
										'icon-button--secondary-selected': viewType === 'list'
									}]"
									type="list"
									@click="setViewType('list')"
								></icon-button>
							</template>
							<template #tooltip>
								Display as list
							</template>
						</with-simple-tooltip>
					</div>
				</div>

				<template v-if="viewType === 'group'">
					<color-list-tree :colorTree="colorGroups"></color-list-tree>
				</template>
				<template v-if="viewType === 'list'">
					<color-list-display :colorList="colorList"></color-list-display>
				</template>


			</perfect-scrollbar>
			<div class="modal-buttons">
				<Button
					ref="modalCancel"
					type="secondary"
					@click="cancellation"
					@keyup.enter="cancellation"
				>
					{{ buttons.cancel|| 'Cancel' }}
				</Button>
				<Button
					ref="modalConfirm"
					type="primary"
					@click="confirmation"
					@keyup.enter="confirmation"
				>
					{{ buttons.confirm || 'Confirm' }}
				</Button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref, PropType } from 'vue'
import { useThemesStore } from '../../../stores/themes'
import ColorListTree from './ColorListTree.vue'
import ColorListDisplay from './ColorListDisplay.vue'
import IconButton from '@/components/general/IconButton.vue'
import Button from '@/components/general/Button.vue'
import WithSimpleTooltip from '@/components/general/WithSimpleTooltip.vue'
import { generateStyles } from '../../../utils/setFigmaStyles'

export default defineComponent( {
	components: {
		ColorListTree,
		ColorListDisplay,
		IconButton,
		Button,
		WithSimpleTooltip,
	},
	props: {
		closeOverlay: {
			type: Function,
			required: true,
		},
		title: {
			type: String,
			required: false,
			default: 'Style Generation',
		},
		buttons: {
			type: Object as PropType<{ cancel: string; confirm: string }>,
			required: true,
		},
		guid: {
			type: String,
			required: true,
		},
	},
	setup( props ) {

		const themeStore = useThemesStore()
		const themes = themeStore.themes
		const thisTheme = themes[props.guid]
		const name = thisTheme.name

		const modalWrapper: Ref<HTMLElement | null> = ref( null )
		const modalCancel: Ref<{ button: HTMLElement} | null> = ref( null )
		const modalConfirm: Ref<{ button: HTMLElement} | null> = ref( null )

		const viewType: Ref<'group' | 'list'> = ref( 'group' )

		const colorGroups = themeStore.getColorList( props.guid )
		const colorList = themeStore.getFigmaColorList( props.guid, false )

		function confirmation() {
			generateStyles( themeStore.getFigmaColorList( props.guid ) )
			props.closeOverlay()
		}

		function cancellation() {
			props.closeOverlay()
		}

		function setViewType( type: 'group' | 'list' ) {
			viewType.value = type
		}

		return {
			name,
			viewType,
			colorGroups,
			colorList,
			setViewType,
			cancellation,
			confirmation,
			modalWrapper,
			modalCancel,
			modalConfirm,
		}
	},
} )
</script>