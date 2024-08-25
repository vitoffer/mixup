<script setup>
import { ref, reactive } from "vue"
import { useLoadingImage } from "@/composables/loadingImage"
import { useTrackItemStyles } from "@/composables/trackItem"
import { hasYoutubeLink } from "@/modules/trackList"
import { generateTrackItemStyles } from "@/modules/functions"
import { getPlatformLink, getPlatformLogo } from "@/modules/platforms"

const props = defineProps({
	type: {
		type: String,
		required: true,
	},
	track: {
		type: Object,
		required: true,
		validator(track) {
			return (
				typeof track.name === "string" &&
				track.authors.every((author) => typeof author === "string")
			)
		},
	},
})

const baseTrackItemStyles = {
	backgroundColor: "transparent",
	borderRadius: "0",
	borderColor: "var(--gray-700)",
}

const highlightedTrackItemStyles = {
	backgroundColor: "var(--gray-800)",
	borderRadius: "20px",
	borderColor: "transparent",
}

const trackItemStyles = reactive({
	"track-item": baseTrackItemStyles,
	...generateTrackItemStyles(props.type),
})

const imageUrl = useLoadingImage(props.track.imageName)

function changeTrackItemStyles(event, isSelected) {
	trackItemStyles["track-item"] = isSelected
		? highlightedTrackItemStyles
		: baseTrackItemStyles

	const nextSibling = event.target.nextSibling

	if (!nextSibling || !nextSibling.style) {
		return
	}

	nextSibling.style.borderTopColor = isSelected
		? "transparent"
		: "var(--gray-700)"
}

</script>

<template>
	<li
		class="track-item"
		@mouseenter="changeTrackItemStyles($event, true)"
		@mouseleave="changeTrackItemStyles($event, false)"
		:style="trackItemStyles['track-item']"
	>
		<RouterLink :to="`/tracks/${track._id}`">
			<article
				class="track-item__content track"
				:style="trackItemStyles['track-item__content']"
			>
				<img
					class="track__image"
					:src="imageUrl"
					:style="trackItemStyles['track__image']"
					alt="Track image"
				/>
				<div
					class="track__info"
					:style="trackItemStyles['track__info']"
				>
					<p
						class="track__name"
						:style="trackItemStyles['track__name']"
					>
						{{ track.name }}
					</p>
					<p
						class="track__author"
						:style="trackItemStyles['track__author']"
					>
						{{ track.authors.join(", ") }}
					</p>
				</div>
				<template v-if="type === 'default'">
					<ol class="track__mixed-track-list mixed-track-list">
						<li
							class="mixed-track-list__item"
							v-for="mixedTrack in track.mixedTracks.slice(0, 2)"
							:key="mixedTrack"
						>
							{{ mixedTrack.name }} - {{ mixedTrack.authors.join(", ") }}
						</li>
					</ol>
					<a
						v-if="hasYoutubeLink(track.platformLinks)"
						:href="hasYoutubeLink(track.platformLinks)"
						class="track__youtube-link"
						target="_blank"
						@click.stop
					>
						<img
							class="track__youtube-logo"
							src="@/assets/images/youtube_logo.svg"
							alt="Youtube logo"
						/>
					</a>
				</template>
				<template v-else>
					<ul class="track__platform-list platform-list">
						<li
							class="platform-list__item platform-item"
							v-for="platform in Object.keys(track.platformLinks)"
							:key="platform"
						>
							<a
								class="platform-item__link"
								:href="getPlatformLink(track, platform)"
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
				</template>
			</article>
		</RouterLink>
	</li>
</template>

<style scoped>
.track-item {
	border-top: solid 1px var(--gray-700);
}

.track-item:last-child {
	border-bottom: solid 1px var(--gray-700);
}

.track-item__content {
	gap: 32px;
}

.track__image {
	aspect-ratio: 1;
	border-radius: 10px;
}

.track__info {
	display: flex;
	flex-direction: column;
}

.track__name {
	font-weight: bold;
	color: var(--yellow-900);
}

.track__author {
	font-weight: 600;
	color: var(--yellow-700);
}

.track__mixed-track-list {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.mixed-track-list__item {
	list-style: decimal inside;
	font-size: 1rem;
	line-height: 1.375rem;
	color: var(--cyan-700);
}

.track__youtube-link {
	align-self: center;
	justify-self: end;
	padding: 10px;
	line-height: 0;
}

.track__youtube-logo {
	width: 32px;
}

.track__platform-list {
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
