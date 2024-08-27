<script setup>
import BaseTrackItem from "@/components/BaseTrackItem.vue"
import { getPlatformLink, getPlatformLogo } from "@/modules/platforms"
import { isTrackListValid } from "@/modules/validators"

defineProps({
	mixedTracks: {
		type: Array,
		required: true,
		validator: isTrackListValid,
	},
})
</script>

<template>
	<section class="track-page__mixed-tracks mixed-tracks">
		<template v-if="mixedTracks.length !== 0">
			<h3 class="mixed-tracks__title">Mixed треки:</h3>
			<ul class="mixed-tracks__list">
				<BaseTrackItem
					v-for="track in mixedTracks"
					:key="track._id"
					type="mix"
					:track="track"
				>
					<template #mixed-track-list>
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
				</BaseTrackItem>
			</ul>
		</template>
		<h3
			class="mixed-tracks__title"
			v-else
		>
			Нет mixed треков
		</h3>
	</section>
</template>

<style scoped>
.track-page__mixed-tracks {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 32px 152px;
}

.mixed-tracks__list {
	width: 100%;
}

.mixed-tracks__title {
	font-size: 24px;
	line-height: 33px;
	font-weight: bold;
	color: var(--cyan-500);
	margin-bottom: 16px;
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

:deep(.track-item__content) {
	display: flex;
	align-items: center;
	gap: 32px;
	padding: 16px 32px;
}

:deep(.track__thumbnail) {
	width: 100px;
}

:deep(.track__info) {
	gap: 10px;
}

:deep(.track__name) {
	font-size: 1.5rem;
	line-height: 2.0625rem;
}

:deep(.track__author) {
	font-size: 1.25rem;
	line-height: 1.6875rem;
}
</style>
