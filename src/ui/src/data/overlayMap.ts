import { OverlayMap } from '../types/OverlayMap'
import ColorPicker from '../components/overlay/ColorPicker.vue'

export const overlayTypes: OverlayMap = {
	'color-picker': {
		overlayComponent: ColorPicker,
	},
	'modal': {
		// Come back to this later
		overlayComponent: {},
	},
}