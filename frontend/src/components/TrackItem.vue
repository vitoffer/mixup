<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router"
import thumbnailPlaceholder from "@/assets/images/thumbnail_placeholder.png"
import { Track, TrackSuggestion } from "@/types"
import { computed, ref, watch } from "vue"
import { useUserStore } from "@/stores/userStore"
import { useConfirm } from "primevue"
import { deleteTrack } from "@/api/deleteTrack"
import { useToastStore } from "@/stores/toastStore"
import { useMixEditStore } from "@/stores/mixEditStore"

const props = withDefaults(
	defineProps<{
		track: TrackSuggestion
		withLinks?: boolean
		unbordered?: boolean
		editable?: boolean
	}>(),
	{
		withLinks: false,
		unbordered: false,
		editable: false,
	},
)

const emit = defineEmits<{
	loadTracks: []
}>()

const userStore = useUserStore()
const confirm = useConfirm()
const toastStore = useToastStore()
const router = useRouter()

const navLink = computed(() => {
	return "id" in props.track
		? {
				name: "trackPage",
				params: { id: props.track.id },
			}
		: null
})

const imageLoaded = ref(false)
const imageSrc = ref(props.track.thumbnailUrl)

const imagePlaceholderSetTimeout = setTimeout(() => {
	imageSrc.value = thumbnailPlaceholder
}, 250)

watch(
	() => imageLoaded.value,
	(newValue) => {
		if (newValue) {
			clearTimeout(imagePlaceholderSetTimeout)
		}
	},
)

function editTrack() {
	const mixEditStore = useMixEditStore()
	const track = props.track as Track
	mixEditStore.mix = {
		id: track.id,
		title: track.title,
		artistsNames: track.artistsNames.join(", "),
		tags: track.tags,
		savedLinks: {
			yandexMusic: track.urls.yandexMusic || "",
			youtubeMusic: track.urls.youtubeMusic || "",
			spotify: track.urls.spotify || "",
		},
		originalTracks: track.originalTracks,
	}
	router.push({ name: "createMix" })
}

function confirmDelete() {
	confirm.require({
		message: "Вы уверены, что хотите удалить этот трек?",
		acceptLabel: "Удалить",
		rejectLabel: "Отмена",
		modal: true,
		acceptClass:
			"text-red-900 border border-red-900 rounded-[10px] px-2 py-1 cursor-pointer",
		rejectClass:
			"border border-cyan-700 rounded-[10px] px-2 py-1  cursor-pointer",
		accept: async () => {
			const success = await deleteTrack((props.track as Track).id)
			if (!success) {
				toastStore.addToast({
					summary: "Ошибка при удалении трека",
				})
				return
			}
			toastStore.addToast({
				summary: "Трек успешно удален",
			})
			emit("loadTracks")
		},
	})
}
</script>

<template>
	<article
		class="h-fit w-full"
		:class="{ 'border-y border-gray-700': !unbordered }"
	>
		<component
			:is="withLinks ? RouterLink : 'div'"
			:to="navLink"
			class="flex h-fit items-center gap-3 py-2"
		>
			<div class="relative aspect-square min-h-12 rounded-[10px]">
				<div
					v-if="!imageLoaded"
					class="absolute inset-0 z-10 h-full w-full rounded-[10px] bg-gray-700"
				></div>
				<img
					:src="imageSrc"
					alt="Картинка трека"
					class="absolute inset-0 h-full w-full rounded-[10px] object-cover"
					@load="imageLoaded = true"
				/>
			</div>
			<div class="flex w-full flex-col gap-[6px]">
				<p class="line-clamp-1 text-[1rem] break-words text-yellow-900">
					{{ track.title }}
				</p>
				<p class="truncate text-[0.875rem] text-yellow-700">
					{{ track.artistsNames.join(", ") }}
				</p>
			</div>
			<div
				v-if="userStore.checkRole(['moderator', 'admin']) && editable"
				class="pointer-events-auto flex gap-3"
			>
				<button
					@click.stop.prevent="editTrack"
					class="cursor-pointer"
				>
					<i class="pi pi-pencil text-2xl text-yellow-800"></i>
					<span class="hidden">Редактировать трек</span>
				</button>
				<button
					@click.stop.prevent="confirmDelete"
					class="cursor-pointer"
				>
					<i class="pi pi-times text-2xl text-red-900"></i>
					<span class="hidden">Удалить трек</span>
				</button>
			</div>
		</component>
	</article>
</template>

<style scoped>
p {
	text-wrap: balance;
}
</style>
