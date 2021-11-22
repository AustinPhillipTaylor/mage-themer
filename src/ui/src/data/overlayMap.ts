import { OverlayMap } from '../types/OverlayMap'
import ColorPicker from '../components/overlay/ColorPicker.vue'
import FileImport from '../components/overlay/FileImport/FileImport.vue'

export const overlayTypes: OverlayMap = {
	'color-picker': {
		overlayComponent: ColorPicker,
	},
	'file-import': {
		overlayComponent: FileImport,
	},
	'modal': {
		// Come back to this later
		overlayComponent: {},
	},
}