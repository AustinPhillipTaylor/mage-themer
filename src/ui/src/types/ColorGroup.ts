import { ColorStyle } from './ColorStyle'

export interface ColorGroup {
	groupName?: string
	subGroups: ColorGroup[]
	styles: ColorStyle[]
}