<script setup lang="ts">
import BackButton from "@/components/BackButton.vue"
import CreateTrackLayout from "@/components/CreateTrack/Layout.vue"
</script>

<template>
	<BackButton />
	<CreateTrackLayout
		header-text="Добавление оригинала"
		success-message="Оригинал успешно создан"
	></CreateTrackLayout>
</template>

<style></style>
