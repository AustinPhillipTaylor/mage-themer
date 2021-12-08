import { OverlayMap } from '../types/OverlayMap'
import ColorPicker from '../components/overlay/ColorPicker.vue'
import FileImport from '../components/overlay/FileImport/FileImport.vue'
import ConfirmationModal from '../components/overlay/ConfirmationModal.vue'
import GenerateThemeStyles from '../components/overlay/Generation/GenerateThemeStyles.vue'

export const overlayTypes: OverlayMap = {
	'color-picker': {
		overlayComponent: ColorPicker,
	},
	'file-import': {
		overlayComponent: FileImport,
	},
	'confirmation-modal': {
		overlayComponent: ConfirmationModal,
	},
	'generate-theme': {
		overlayComponent: GenerateThemeStyles,
	},
}