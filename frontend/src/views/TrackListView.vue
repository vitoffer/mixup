<script setup>
import { ref } from "vue"
import TrackListSearchBar from "@/components/TrackListSearchBar.vue"
import TrackList from "@/components/TrackList.vue"

const searchTrack = ref("")
</script>

<template>
	<TrackListSearchBar v-model="searchTrack" />
	<TrackList :search-track="searchTrack" />
</template>
