export interface ConfirmationModalButtons {
	cancel?: {
		text?: string
		callback?: () => any
	}
	confirm: {
		text?: string
		callback: () => any
	}
}