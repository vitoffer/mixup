<script setup>
import { onMounted, ref } from "vue"
import TrackInside from "./TrackCard/TrackCardTrackInside.vue"
import EmptyBlock from "../utilities/EmptyBlock.vue"
import TrackCardImage from "./TrackCard/TrackCardImage.vue"
import TrackCardTextBlock from "./TrackCard/TrackCardTextBlock.vue"
import TrackCardTrackInsideList from "./TrackCard/TrackCardTrackInsideList.vue"
import TrackCardPlatformLinkList from "./TrackCard/TrackCardPlatformLinkList.vue"

const props = defineProps(["track"])

const tracksInside = props.track.tracksInside

const tracksInsideFiltered =
	tracksInside.length > 2 ? tracksInside.slice(0, 2) : tracksInside

let tracksInsideList = ref(tracksInsideFiltered)
let extraLines = Math.max(0, tracksInside.length - 2)

let [emptyBlockAfterTitle, emptyBlockAfterAuthor, emptyBlockAfterList] = [
	false,
	false,
	false,
]

let lis

// onMounted(() => {
// 	// const title = document.getElementById(`${props.track.id}-h2`)

// 	const ul = document.getElementById(`${props.track.id}-ul`)
// 	lis = ul.children

// 	// if (linesCount(title) == 1) {
// 	// 	ul.style.marginTop = "auto"
// 	// 	ul.style.marginBottom = "16px"
// 	// } else {
// 	// 	ul.style.marginTop = "4px"
// 	// }

// 	lis = Array.from(lis)

// 	if (lis.length == 1) {
// 		ul.style.marginTop = "auto"
// 		ul.style.marginBottom = "16px"
// 	} else if (lis.length > 2) {
// 		extraLines = lis.length - 2
// 		lis = lis.slice(0, 2)
// 	}
// 	lis.forEach(
// 		(element) => {
// 			if (lis.indexOf(element) == lis.length - 1 && extraLines) {
// 				// if (!isEllipsisActive(element.children[0])) {
// 				element.children[0]
// 			}

// 			const extraLinesIndicator = document.createElement("span")
// 			extraLinesIndicator.textContent = `| +${extraLines}`
// 			extraLinesIndicator.classList.add(
// 				"text-cyan-accent",
// 				"ml-[5px]",
// 				"whitespace-nowrap",
// 			)

// 			element.append(extraLinesIndicator)
// 		},
// 		// }
// 	)
// })

// function isEllipsisActive(e) {
// 	return e.offsetWidth < e.scrollWidth
// }

// function getCoords(elem) {
// 	let box = elem.getBoundingClientRect()

// 	return {
// 		top: box.top + window.scrollY,
// 		right: box.right + window.scrollX,
// 		bottom: box.bottom + window.scrollY,
// 		left: box.left + window.scrollX,
// 	}
// }





// 	switch (elType) {
// 		case "title":
// 			emptyBlockAfterTitle = true
// 			break
// 		case "author":
// 			emptyBlockAfterAuthor = true
// 			break
// 		case "list":
// 			emptyBlockAfterList = true
// 			break
// 	}

// 	el.classList.add(
// 		"expanded",
// 		"bg-gray-light",
// 		linesCount(el) == 1 ? "rounded-[5px]" : "rounded-[10px]",
// 		"absolute",
// 		"p-[5px]",
// 	)

// 	let calculatedTop = elTop - cardTop - 5
// 	calculatedTop -=
// 		elType == "list" && computedStyles.marginBottom == "8px"
// 			? 4
// 			: elType == "list" && computedStyles.marginBottom == "16px"
// 				? -0.1
// 				: 0

// 	el.style.cssText += `
// 	z-index: 1;
// 	width: 384px;
// 	top: ${calculatedTop}px;
// 	left: -48px;
// 	box-shadow: 0 0 4px 0 rgba(0 0 0 / 10%);
// 	`
// }

// function clearFullTextWidget(el) {
// 	if (!el.classList.contains("expanded")) {
// 		return
// 	}

// 	el.style.width = "initial"
// 	el.classList.remove(
// 		"bg-gray-light",
// 		"absolute",
// 		"rounded-[10px]",
// 		"expanded",
// 		"p-[5px]",
// 	)

// 	if (el.nextSibling.classList.contains("empty-el")) {
// 		el.nextSibling.style.display = "none"
// 	}
// }

// function showFullList(event) {
// 	const el = event.target

// 	if (extraLines == 0 && lis.every((li) => !isEllipsisActive(li.children[0]))) {
// 		return
// 	}

// 	tracksInsideList.value = tracksInside

// 	drawFullTextWidget(el, "list")

// 	Array.from(el.children).forEach((li) => {
// 		const liChildren = li.children
// 		liChildren[0].classList.remove(
// 			"overflow-hidden",
// 			"text-ellipsis",
// 			"whitespace-nowrap",
// 		)
// 		if (liChildren.length == 2) {
// 			liChildren[1].style.display = "none"
// 		}
// 	})
// 	el.classList.add("flex", "flex-col", "items-center")
// }

// function hideFullList(event) {
// 	const el = event.target
// 	tracksInsideList.value = tracksInsideFiltered
// 	clearFullTextWidget(el)
// 	Array.from(el.children).forEach((li) => {
// 		const liChildren = li.children
// 		liChildren[0].classList.add(
// 			"overflow-hidden",
// 			"text-ellipsis",
// 			"whitespace-nowrap",
// 		)
// 		if (liChildren.length == 2) {
// 			liChildren[1].style.display = "inline"
// 		}
// 	})
// }
</script>

<template>
	<div
		class="card relative flex flex-col items-center rounded-[20px] bg-gray p-[16px] text-center shadow-card"
	>
		<TrackCardImage :image-url="track.imageUrl" />
		<TrackCardTextBlock
			:id="track.id"
			:title="track.title"
			:author="track.author"
		/>
		<TrackCardTrackInsideList :track-inside-list="track.tracksInside" />
		<TrackCardPlatformLinkList :platform-list="track.platforms" />
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
	top: 10px;
	transform: translateY(-50%);
	@apply bg-cyan-light;
}
</style>
