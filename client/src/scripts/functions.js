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
