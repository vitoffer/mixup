<script setup lang="ts">
import { CreateTrackPlatformTab, Platform } from "@/types"
import PlatformTab from "./PlatformTab.vue"

defineProps<{
	tabs: CreateTrackPlatformTab[]
	savedLinks: Record<Platform, string>
	iconStates: Record<Platform, string>
}>()

defineEmits<{
	clearLink: [event: Event, platform: Platform]
}>()

const currentPlatform = defineModel("currentPlatform")
</script>

<template>
	<Tabs
		value="youtubeMusic"
		@update:value="currentPlatform = $event as Platform"
	>
		<TabList>
			<Tab
				v-for="tab in tabs"
				:key="tab.platform"
				:value="tab.platform"
				class="gap-1.5"
			>
				<PlatformTab v-bind="{ tab, tabs, savedLinks, iconStates }" />
			</Tab>
		</TabList>
		<TabPanels>
			<TabPanel
				v-for="tab in tabs"
				:key="tab.platform"
				:value="tab.platform"
			>
				<FloatLabel variant="in">
					<InputText
						type="text"
						v-model="savedLinks[tab.platform as keyof typeof savedLinks]"
						class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
						:id="`editLink_${tab.platform}`"
					></InputText>
					<label :for="`editLink_${tab.platform}`">
						{{ tab.placeholder }}
					</label>
				</FloatLabel>
			</TabPanel>
		</TabPanels>
	</Tabs>
</template>

<style scoped></style>
