<script setup>
import TrackList from "../components/TheTrackList.vue"
import TheHeader from "../components/TheHeader.vue"
</script>

<template>
	<div
		class="bg-gray pt-[16px]"
		style="width: 100%; min-height: 100vh"
	>
		<div style="width: 1440px; margin: auto">
			<TheHeader />
			<TrackList />
		</div>
	</div>
</template>
