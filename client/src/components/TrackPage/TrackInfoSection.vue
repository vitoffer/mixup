<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Return } from "@icon-park/vue-next"
import { useLoadingImage } from "@/composables/loadingImage"
import { getPlatformLink, getPlatformLogo } from "@/platforms"

const props = defineProps(["track"])

const router = useRouter()

const prevLink = ref(router.options.history.state.back)
const imageUrl = useLoadingImage(props.track.imageUrl, () => props.track)
</script>

<template>
	<section class="track-page__info track-info">
		<a
			class="track-info__return-link"
			:href="prevLink"
			@click.prevent="$router.back()"
		>
			<Return
				class="track-info__return-icon"
				theme="outline"
				size="24"
			/>
		</a>
		<img
			class="track-info__image"
			:src="imageUrl"
			alt="Track image"
		/>
		<div class="track-info__description track-description">
			<h3 class="track-description__name">{{ track.name }}</h3>
			<p class="track-description__author">{{ track.authors.join(", ") }}</p>
			<ul class="track-description__platform-list platform-list">
				<li
					class="platform-list__item platform-item"
					v-for="platform in Object.keys(track.platformLinks)"
					:key="platform"
				>
					<a
						class="platform-item__link"
						:href="getPlatformLink(track, platform)"
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
		</div>
	</section>
</template>

<style scoped>
.track-page__info {
	display: grid;
	grid-template-columns: 24px 300px auto;
	gap: 64px;
	margin: 0 64px;
	padding-block: 32px;
	border-bottom: solid 1px var(--gray-700);
}

.track-info__return-link {
	align-self: start;
	width: fit-content;
	padding: 10px;
	margin: -10px 0 -10px -10px;
	line-height: 0;
}

.track-info__return-icon {
	color: var(--cyan-500);
}

.track-info__image {
	width: 300px;
	aspect-ratio: 1;
	border-radius: 20px;
}

.track-info__description {
	justify-self: center;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-top: 24px;
}

.track-description__name {
	font-size: 36px;
	line-height: 49px;
	font-weight: bold;
	color: var(--yellow-900);
}

.track-description__author {
	font-size: 32px;
	line-height: 44px;
	font-weight: 600;
	color: var(--yellow-700);
}

.track-description__platform-list {
	display: flex;
	justify-content: center;
	gap: 4px;
	margin-block: auto 24px;
}

.platform-item__link {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 5px;
	background-color: var(--gray-700);
}

.platform-list__item:first-child .platform-item__link {
	padding-left: 8px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
}

.platform-list__item:last-child .platform-item__link {
	padding-right: 8px;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
}

.platform-item__image {
	width: 32px;
}
</style>
