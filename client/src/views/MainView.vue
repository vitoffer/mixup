<script setup>
import { ref } from "vue"
import TheSearchBar from "../components/TheSearchBar.vue"
import TheTrackList from "../components/TheTrackList.vue"

const searchTrack = ref("")
</script>

<template>
	<TheSearchBar v-model="searchTrack" />
	<TheTrackList :search-track="searchTrack" />
</template>
