// Generate Figma paint style
export function createSolidPaintStyle( name: string, color: RGB ) {
	const style = figma.createPaintStyle()
	style.name = name
	style.paints = [{
		type: 'SOLID',
		color,
	}]
}