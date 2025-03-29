<script setup lang="ts">
import { CreateTrackPlatformTab, Platform } from "@/types"
import markIcon from "../../assets/icons/mark.svg?url"
import crossIcon from "../../assets/icons/cross.svg?url"

defineProps<{
	tab: CreateTrackPlatformTab
	savedLinks: Record<Platform, string>
	iconStates: Record<Platform, string>
}>()
</script>

<template>
	<img
		:src="tab.icon"
		alt="Лого платформы"
		class="max-h-[36px] w-[38px]"
	/>
	<div
		v-if="!savedLinks[tab.platform as keyof typeof savedLinks]"
		class="flex aspect-square w-6 items-center justify-center after:block after:aspect-square after:w-2 after:rounded-full after:bg-cyan-700"
	></div>
	<img
		v-else
		:src="iconStates[tab.platform]"
		alt="Индикатор заполненности ссылки на платформу"
		class="cursor-pointer"
		@click.prevent="$emit('clearLink', $event, tab.platform)"
		@mouseenter="iconStates[tab.platform] = crossIcon"
		@mouseleave="iconStates[tab.platform] = markIcon"
	/>
</template>

<style scoped></style>
