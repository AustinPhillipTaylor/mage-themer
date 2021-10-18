// Utility to split styles names by folder delimiter
export function nameParts( name: string ) {
	const nameParts = name.split( "/" ).filter( ( part: string ) => !!part )
	return nameParts.map( ( part: string ) => part.trim() )
}