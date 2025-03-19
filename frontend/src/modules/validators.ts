export function isTrackValid(track) {
	return (
		typeof track.name === "string" &&
		track.authors.every((author) => typeof author === "string")
	)
}

export function isTrackListValid(trackList) {
	return trackList.every(isTrackValid)
}
