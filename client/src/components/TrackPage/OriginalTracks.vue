<script setup>
import youtubeLogo from "@/assets/images/youtube_logo.svg"
import spotifyLogo from "@/assets/images/spotify_logo.svg"
import vkLogo from "@/assets/images/vk_logo.svg"
import yandexLogo from "@/assets/images/yandex_logo.svg"

const props = defineProps(["track"])

const platforms = ["youtube", "spotify", "vk", "yandex"]

function getPlatformLogo(platform) {
	switch (platform) {
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
	console.log(
		props.track.platforms.find((platformItem) => platformItem.name == platform),
	)

	const platformItem = props.track.platforms.find(
		(platformItem) => platformItem.name == platform,
	)

	if (platformItem?.link) {
		return platformItem.link
	}
	return "/"
}
</script>

<template>
	<section class="track-page__original-tracks original-tracks">
		<h3 class="original-tracks__title">Original tracks:</h3>
		<ul class="original-tracks__list">
			<li
				class="original-tracks__item original-track"
				v-for="originalTrack in track.originalTracks"
				:key="originalTrack.name"
			>
				<img
					class="original-track__image"
					:src="originalTrack.imageUrl"
					alt="Original track image"
				/>
				<div class="original-track__description">
					<h4 class="original-track__name">{{ originalTrack.name }}</h4>
					<p class="original-track__author">{{ originalTrack.author }}</p>
				</div>
				<ul class="original-track__platform-list platform-list">
					<li
						class="platform-list__item platform-item"
						v-for="platform in platforms"
						:key="platform"
					>
						<a
							class="platform-item__link"
							:href="getPlatformLink(platform)"
							target="_blank"
						>
							<img
								class="platform-item__image"
								:src="getPlatformLogo(platform)"
								alt="Platform logo"
							/>
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</section>
</template>

<style scoped>
.track-page__original-tracks {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 32px 152px;
}

.original-tracks__title {
	font-size: 24px;
	line-height: 33px;
	font-weight: bold;
	color: var(--cyan-500);
}

.original-tracks__list {
	width: 100%;
}

.original-tracks__item {
	display: flex;
	align-items: center;
	gap: 32px;
	padding: 16px 32px;
}

.original-tracks__item:not(:first-child) {
	border-top: solid 1px var(--gray-700);
}

.original-track__image {
	width: 100px;
	aspect-ratio: 1;
	border-radius: 10px;
}

.original-track__description {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.original-track__name {
	font-size: 24px;
	line-height: 33px;
	font-weight: bold;
	color: var(--yellow-900);
}

.original-track__author {
	font-size: 20px;
	line-height: 27px;
	font-weight: 600;
	color: var(--yellow-700);
}

.original-track__platform-list {
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
