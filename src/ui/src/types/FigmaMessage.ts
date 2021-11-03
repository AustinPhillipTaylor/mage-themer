export interface FigmaMessage {
	type: string
	[key: string]: any
}

export interface MessageWaitingForResponse extends FigmaMessage {
	messageIdentifier: string
}