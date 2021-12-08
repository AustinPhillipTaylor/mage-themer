export function escapeEntities( text: string ) {
	const escape = document.createElement( 'textarea' )
	escape.textContent = text
	return escape.innerHTML.replace( /\//g, '&#47;' )
}

export function unescapeEntities( text: string ) {
	const escape = document.createElement( 'textarea' )
	escape.innerHTML = text
	return escape.textContent
}