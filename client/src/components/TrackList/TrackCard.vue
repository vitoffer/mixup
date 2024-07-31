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

	console.log(title, "is clamped", isClamped(title))
	if (countLines(title) == 1) {
		console.log("1 line")
		ul.style.marginTop = "auto"
	} else {
		console.log("2 lines")
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
			extraLinesIndicator.classList.add("text-cyan-accent")
			extraLinesIndicator.classList.add("ml-[5px]")
			extraLinesIndicator.classList.add("whitespace-nowrap")
			element.append(extraLinesIndicator)
		}
		console.log(element, "is ellipsis", isEllipsisActive(element.children[0]))
	})
})

function isEllipsisActive(e) {
	return e.offsetWidth < e.scrollWidth
}

function isClamped(e) {
	return e.scrollHeight > e.clientHeight
}

function countLines(el) {
	var divHeight = el.offsetHeight

	const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight)

	var lines = Math.round(divHeight / lineHeight)
	return lines
}
</script>

<template>
	<div
		class="flex flex-col items-center rounded-[20px] bg-gray p-[16px] text-center shadow-card"
	>
		<img
			:src="$props.track.image"
			alt="Card image"
			width="256"
			class="mb-[8px]"
		/>
		<div class="flex flex-col gap-[4px]">
			<h2
				class="line-clamp-2 text-[18px] leading-[1.3] text-yellow"
				ref="el"
				:id="`${$props.track.id}-h2`"
			>
				{{ $props.track.title }}
			</h2>
			<p
				class="line-clamp-1 font-accent text-[16px] leading-[1.3] text-yellow-light"
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
