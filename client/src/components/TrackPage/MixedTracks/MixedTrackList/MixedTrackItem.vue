<script setup>
import youtubeLogo from "@/assets/images/youtube_logo.svg"
import spotifyLogo from "@/assets/images/spotify_logo.svg"
import vkLogo from "@/assets/images/vk_logo.svg"
import yandexLogo from "@/assets/images/yandex_logo.svg"
import { onMounted, ref } from "vue"

const props = defineProps(["mixedTrack"])

const isImageLoading = ref(false)
const imageUrl = ref("")
const mixedTrackItemStyles = ref({})

const baseMixedTrackItemStyles = {
	backgroundColor: "transparent",
	borderRadius: "0",
	borderColor: "var(--gray-700)",
}

const highlightedMixedTrackItemStyles = {
	backgroundColor: "var(--gray-800)",
	borderRadius: "20px",
	borderColor: "transparent",
}

onMounted(() => {
	loadImage(props.mixedTrack.imageName)

	setTimeout(() => {
		if (isImageLoading.value) {
			imageUrl.value = "/image_not_loaded.png"
		}
	}, 3000)
})

async function loadImage(imageName) {
	isImageLoading.value = true

	const response = await fetch(`http://localhost:3000/api/images/${imageName}`)
	const blob = await response.blob()
	imageUrl.value = URL.createObjectURL(blob)

	isImageLoading.value = false
}

function changeMixedTrackItemStyles(event, isSelected) {
	mixedTrackItemStyles.value = isSelected
		? highlightedMixedTrackItemStyles
		: baseMixedTrackItemStyles

	const nextSibling = event.target.nextSibling
	if (!nextSibling || !nextSibling.style) {
		return
	}

	nextSibling.style.borderTopColor = isSelected
		? "transparent"
		: "var(--gray-700)"
}

function getPlatformLogo(platformName) {
	switch (platformName) {
		case "youtube":
			return youtubeLogo
		case "spotify":
			return spotifyLogo
		case "vk":
			return vkLogo
		case "yandex":
			return yandexLogo
	}
}

function getPlatformLink(platform) {
	return props.mixedTrack.platformLinks[platform] || "/"
}
</script>

<template>
	<li
		class="mixed-tracks__item mixed-track"
		@mouseenter="changeMixedTrackItemStyles($event, true)"
		@mouseleave="changeMixedTrackItemStyles($event, false)"
		:style="mixedTrackItemStyles"
	>
		<RouterLink :to="`/tracks/${mixedTrack._id}`">
			<article class="mixed-track__wrapper">
				<img
					class="mixed-track__image"
					:src="imageUrl"
					alt="mixed track image"
				/>
				<div class="mixed-track__description">
					<h4 class="mixed-track__name">{{ mixedTrack.name }}</h4>
					<p class="mixed-track__author">
						{{ mixedTrack.authors.join(", ") }}
					</p>
				</div>
				<ul class="mixed-track__platform-list platform-list">
					<li
						class="platform-list__item platform-item"
						v-for="platform in Object.keys(mixedTrack.platformLinks)"
						:key="platform"
					>
						<a
							class="platform-item__link"
							:href="getPlatformLink(platform)"
							target="_blank"
							@click.stop
						>
							<img
								class="platform-item__image"
								:src="getPlatformLogo(platform)"
								alt="Platform logo"
							/>
						</a>
					</li>
				</ul>
			</article>
		</RouterLink>
	</li>
</template>

<style scoped>
.mixed-tracks__item {
	border-top: solid 1px var(--gray-700);
}

.mixed-tracks__item:last-child {
	border-bottom: solid 1px var(--gray-700);
}

.mixed-track__wrapper {
	display: flex;
	align-items: center;
	gap: 32px;
	padding: 16px 32px;
}

.mixed-tracks__item:not(:first-child) {
	border-top: solid 1px var(--gray-700);
}

.mixed-track__image {
	width: 100px;
	aspect-ratio: 1;
	border-radius: 10px;
}

.mixed-track__description {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.mixed-track__name {
	font-size: 24px;
	line-height: 33px;
	font-weight: bold;
	color: var(--yellow-900);
}

.mixed-track__author {
	font-size: 20px;
	line-height: 27px;
	font-weight: 600;
	color: var(--yellow-700);
}

.mixed-track__platform-list {
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr 1fr;
	gap: 4px;
	margin-left: auto;
}

.platform-item__link {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 3px 5px;
	background-color: var(--gray-700);
}

.platform-list__item:first-child .platform-item__link {
	border-top-left-radius: 10px;
}

.platform-list__item:nth-child(2) .platform-item__link {
	border-top-right-radius: 10px;
}

.platform-list__item:nth-child(3) .platform-item__link {
	border-bottom-left-radius: 10px;
}

.platform-list__item:last-child .platform-item__link {
	border-bottom-right-radius: 10px;
}

.platform-item__image {
	width: 28px;
}
</style>
