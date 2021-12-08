// Stored as object in order to maintain global reference
export const windowSize = {
	windowWidth: 950,
	windowHeight: 600,
}

const minWindowWidth = 600
const minWindowHeight = 400

export function resizerClicked() {
	const { windowWidth: w, windowHeight: h } = windowSize
	// If less then minimums, set to minimum
	windowSize.windowWidth = w < minWindowWidth ? minWindowWidth : w
	windowSize.windowHeight = h < minWindowHeight ? minWindowHeight : h
}

export function resizeWindow( widthAdd: number, heightAdd: number ) {
	// Not necessary, just for a shorthand
	let w = 0
	let h = 0

	// Set window sizes plus mouse movement
	w = windowSize.windowWidth += widthAdd
	h = windowSize.windowHeight += heightAdd

	figma.ui.resize(
		w < minWindowWidth ? minWindowWidth : w,
		h < minWindowHeight ? minWindowHeight : h
	)
}