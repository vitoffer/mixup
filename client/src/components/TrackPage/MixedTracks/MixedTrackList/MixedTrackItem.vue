<script setup>
import { useLoadingImage } from "@/composables/loadingImage"
import { useTrackItem } from "@/composables/trackItem"
import { getPlatformLink, getPlatformLogo } from "@/platforms"

const props = defineProps(["mixedTrack"])

const { trackItemStyles, changeTrackItemStyles } = useTrackItem()

const imageUrl = useLoadingImage(props.mixedTrack.imageName)
</script>

<template>
	<li
		class="mixed-tracks__item mixed-track"
		@mouseenter="changeTrackItemStyles($event, true)"
		@mouseleave="changeTrackItemStyles($event, false)"
		:style="trackItemStyles"
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
							:href="getPlatformLink(mixedTrack, platform)"
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
