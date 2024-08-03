export function linesCount(el) {
	const elHeight = el.getBoundingClientRect().height
	const lineHeight = parseInt(getComputedStyle(el).lineHeight)
	const lines = elHeight / lineHeight

	return Math.round(lines)
}

export function isTextClamped(elm) {
	return elm.scrollHeight > elm.clientHeight
}

export function isEllipsisActive(e) {
	return e.offsetWidth < e.scrollWidth
}

export function getAbsoluteCoords(elem) {
	let box = elem.getBoundingClientRect()

	return {
		top: box.top + window.scrollY,
		left: box.left + window.scrollX,
		bottom: box.bottom + window.scrollY,
		right: box.right + window.scrollX,
	}
}
