<script setup>
import TrackCardImage from "./TrackCard/TrackCardImage.vue"
import TrackCardTextBlock from "./TrackCard/TrackCardTextBlock.vue"
import TrackCardTrackInsideList from "./TrackCard/TrackCardTrackInsideList.vue"
import TrackCardPlatformLinkList from "./TrackCard/TrackCardPlatformLinkList.vue"

defineProps(["track"])
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
