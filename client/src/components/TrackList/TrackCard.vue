<script setup>
import { onMounted } from "vue"

const props = defineProps(["track"])

let tracksInside = props.track.tracksInside
let extraLines = 0
if (tracksInside.length > 2) {
	extraLines = tracksInside.length - 2
	tracksInside = tracksInside.slice(0, 2)
}

onMounted(() => {
	const title = document.getElementById(`${props.track.id}-h2`)

	const ul = document.getElementById(`${props.track.id}-ul`)
	let lis = ul.children

	if (linesCount(title) == 1) {
		ul.style.marginTop = "auto"
		ul.style.marginBottom = "16px"
	} else {
		ul.style.marginTop = "4px"
	}

	lis = Array.from(lis)

	if (lis.length == 1) {
		ul.style.marginTop = "auto"
		ul.style.marginBottom = "16px"
	} else if (lis.length > 2) {
		extraLines = lis.length - 2
		lis = lis.slice(0, 2)
	}
	lis.forEach((element) => {
		if (lis.indexOf(element) == lis.length - 1 && extraLines) {
			if (!isEllipsisActive(element.children[0])) {
				element.children[0]
			}

			const extraLinesIndicator = document.createElement("span")
			extraLinesIndicator.textContent = `| +${extraLines}`
			extraLinesIndicator.classList.add(
				"text-cyan-accent",
				"ml-[5px]",
				"whitespace-nowrap",
			)

			element.append(extraLinesIndicator)
		}
	})
})

function isEllipsisActive(e) {
	return e.offsetWidth < e.scrollWidth
}

function isClamped(e) {
	return e.scrollHeight - e.clientHeight > 5
}

function linesCount(el) {
	const divHeight = el.clientHeight

	const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight)

	const lines = Math.round(divHeight / lineHeight)
	return lines
}

// function mouseOverTitle(e) {
// 	if (!isClamped(e.target)) {
// 		return
// 	}

// 	const el = e.target
// 	el.classList.add("expanded")
// 	const elWidth = el.clientWidth
// 	const elHeight = el.clientHeight

// 	el.style.overflow = "visible"
// 	el.style.position = "absolute"

// 	el.style.width = "150%"
// 	el.style.borderRadius = "10px"
// 	el.style.left = "-25%"
// 	el.style.boxShadow = "0 0 6px 0 rgba(0 0 0 / 10%)"

// 	el.classList.add("bg-gray-light")

// 	if (el.nextSibling.nodeName == "DIV") {
// 		el.nextSibling.style.display = ""
// 	} else {
// 		const emptyEl = document.createElement("div")
// 		emptyEl.style.width = `${elWidth}px`
// 		emptyEl.style.height = `${elHeight - 0.2}px`

// 		el.after(emptyEl)
// 	}
// }

// function mouseOutTitle(e) {
// 	const el = e.target
// 	if (!el.classList.contains("expanded")) {
// 		return
// 	}

// 	el.style.overflow = "hidden"
// 	el.style.position = ""
// 	el.style.width = ""
// 	el.classList.remove("bg-gray-light")

// 	el.nextSibling.style.display = "none"
// }

function showFullText(event) {
	const el = event.target

	if (
		(linesCount(el) >= 2 && !isClamped(el)) ||
		(linesCount(el) == 1 &&
			el.classList.contains("author") &&
			!isClamped(el)) ||
		(linesCount(el) == 1 &&
			!el.classList.contains("author") &&
			!isEllipsisActive(el))
	) {
		return
	}

	const elWidth = el.clientWidth
	const elHeight = el.clientHeight

	const { top: elTop } = getCoords(el)
	const { top: cardTop } = getCoords(el.closest(".card"))

	if (el.nextSibling?.classList.contains("empty-el")) {
		el.nextSibling.style.display = "block"
	} else {
		const emptyEl = document.createElement("div")

		emptyEl.style.width = `${elWidth}px`
		emptyEl.style.height = `${elHeight - 0.2}px`
		emptyEl.classList.add("empty-el")

		el.after(emptyEl)
	}

	el.classList.add(
		"expanded",
		"bg-gray-light",
		linesCount(el) == 1 ? "rounded-[5px]" : "rounded-[10px]",
		"absolute",
		"p-[5px]",
	)

	el.style.cssText = `
	z-index: 1;
	width: 384px;
	top: ${elTop - cardTop - 5}px;
	left: -48px;
	box-shadow: 0 0 4px 0 rgba(0 0 0 / 10%);
	`

	el.classList.remove("line-clamp-1", "line-clamp-2")
}

function hideFullText(event) {
	const el = event.target

	if (!el.classList.contains("expanded")) {
		return
	}

	el.style.width = "initial"
	el.classList.remove(
		"bg-gray-light",
		"absolute",
		"rounded-[10px]",
		"expanded",
		"p-[5px]",
	)

	if (el.classList.contains("author")) {
		el.classList.add("line-clamp-1")
	}
	if (el.classList.contains("title")) {
		el.classList.add("line-clamp-2")
	}

	if (el.nextSibling.classList.contains("empty-el")) {
		el.nextSibling.style.display = "none"
	}
}

function getCoords(elem) {
	let box = elem.getBoundingClientRect()

	return {
		top: box.top + window.scrollY,
		right: box.right + window.scrollX,
		bottom: box.bottom + window.scrollY,
		left: box.left + window.scrollX,
	}
}
</script>

<template>
	<div
		class="card relative flex flex-col items-center rounded-[20px] bg-gray p-[16px] text-center shadow-card"
	>
		<img
			:src="$props.track.image"
			alt="Card image"
			width="256"
			class="mb-[8px]"
		/>
		<div class="flex flex-col gap-[4px]">
			<h2
				class="title line-clamp-2 text-[18px] leading-[1.3] text-yellow"
				ref="el"
				:id="`${$props.track.id}-h2`"
				@mouseover="showFullText"
				@mouseout="hideFullText"
			>
				{{ $props.track.title }}
			</h2>
			<p
				class="author line-clamp-1 font-accent text-[16px] leading-[1.3] text-yellow-light"
				@mouseover="showFullText"
				@mouseout="hideFullText"
			>
				by {{ $props.track.author }}
			</p>
		</div>
		<ul
			class="mb-[8px] text-[14px] leading-[1.4] text-cyan-light"
			:id="`${$props.track.id}-ul`"
		>
			<li
				class="flex max-w-256px items-center justify-center"
				v-for="trackInside in tracksInside"
				:key="trackInside"
			>
				<div
					class="custom-list-marker relative inline-block max-w-256px overflow-hidden text-ellipsis whitespace-nowrap pl-[10px]"
				>
					{{ trackInside }}
				</div>
			</li>
		</ul>
		<div class="flex w-[100%] gap-[8px]">
			<a
				class="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] shadow-link"
				v-for="platform in $props.track.platforms"
				:href="Object.values(platform)[0]"
				:key="platform"
			>
				<img
					class="w-[22px] translate-x-[0.5px]"
					:src="`/src/assets/images/${Object.keys(platform)[0]}_logo.svg`"
					alt="Platform logo"
				/>
			</a>
			<a
				href=""
				class="ml-auto flex h-[30px] w-[30px] items-center justify-center rounded-[8px] shadow-link"
			>
				<img
					class="w-[22px]"
					src="/src/assets/images/discord_logo.svg"
					alt="Discord logo"
				/>
			</a>
		</div>
	</div>
</template>

<style>
.custom-list-marker::before {
	content: "";
	width: 5px;
	aspect-ratio: 1;
	border-radius: 50%;
	position: absolute;

	left: 0;
	top: 50%;
	transform: translateY(-50%);
	@apply bg-cyan-light;
}
</style>
