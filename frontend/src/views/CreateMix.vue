<script setup lang="ts">
import { AutoCompleteCompleteEvent } from "primevue"
import OriginalsEdit from "@/components/CreateTrack/OriginalsEdit.vue"
import { useOriginalTracks } from "@/composables/createTrack/originalTracks"
import CreateTrackLayout from "@/components/CreateTrack/Layout.vue"

const {
	originalTracksSearchInputRounded,
	originalTracksSuggestions,
	searchOriginalTrack,
} = useOriginalTracks()
</script>

<template>
	<CreateTrackLayout
		is-mix
		header-text="Добавление микса"
		success-message="Микс успешно создан"
	>
		<template
			#additionalInfo="{
				originalTracks,
				createOriginal,
				updateOriginalTracksList,
			}"
		>
			<OriginalsEdit
				:original-tracks-suggestions="originalTracksSuggestions"
				:original-tracks-list="originalTracks"
				v-model:original-tracks-search-input-rounded="
					originalTracksSearchInputRounded
				"
				@search-original-track="searchOriginalTrack"
				@create-original="createOriginal"
				@update-original-tracks-list="updateOriginalTracksList"
			/>
		</template>
	</CreateTrackLayout>
</template>

<style></style>
