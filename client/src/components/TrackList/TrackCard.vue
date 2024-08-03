<script setup>
import TrackCardImage from "./TrackCard/TrackCardImage.vue"
import TrackCardTextBlock from "./TrackCard/TrackCardTextBlock.vue"
import TrackCardTrackInsideList from "./TrackCard/TrackCardTrackInsideList.vue"
import TrackCardPlatformLinkList from "./TrackCard/TrackCardPlatformLinkList.vue"
import { onMounted, ref } from "vue"

const props = defineProps(["track"])

const imageUrl = ref("")

onMounted(() => {
	loadImage()
})

async function loadImage() {
	const response = await fetch(
		"http://localhost:3000/get-image?" +
			new URLSearchParams({
				imageUrl: props.track.imageUrl,
			}).toString(),
	)

	if (props.track.imageUrl) {
		const blob = await response.blob()
		if (blob) {
			imageUrl.value = URL.createObjectURL(blob)
		} else {
			console.log("Loading image error")
		}
	} else {
		imageUrl.value = ""
	}
}
</script>

<template>
	<div class="card">
		<TrackCardImage :image-url="imageUrl" />
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
.card {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 20px;
	background-color: var(--gray);
	padding: 16px;
	text-align: center;
	box-shadow:
		0px 0px 8px 0px rgba(121, 174, 163, 0.8),
		0px 0px 8px 0px rgba(121, 174, 163, 0.8) inset;
}
</style>
