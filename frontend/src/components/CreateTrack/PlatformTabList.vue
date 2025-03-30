<script setup lang="ts">
import { Platform } from "@/types"
import PlatformTab from "./PlatformTab.vue"
import { tabs } from "@/modules/createTrackTabs"

defineEmits<{
	clearLink: [event: Event, platform: Platform]
}>()

const currentPlatform = defineModel("currentPlatform")
const savedLinks = defineModel<Record<Platform, string>>("savedLinks")
const iconStates = defineModel<Record<Platform, string>>("iconStates")
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
				<PlatformTab
					:tab="tab"
					v-model:saved-links="savedLinks!"
					v-model:icon-states="iconStates!"
					@clear-link="(event, platform) => $emit('clearLink', event, platform)"
				/>
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
						v-model="savedLinks![tab.platform as keyof typeof savedLinks]"
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

<style>
@reference "../../assets/styles/main.css";

.p-tabs {
	@apply flex w-full flex-col gap-3;
}

.p-tablist-content {
	@apply flex justify-center;
}

.p-tablist-tab-list {
	@apply flex w-full gap-2;
}

.p-tab {
	@apply flex w-full items-center justify-center bg-gray-800 py-2 first:rounded-l-[10px] last-of-type:rounded-r-[10px];
}

.p-tab-active {
	@apply bg-gray-700;
}

.p-tablist-active-bar {
	@apply hidden;
}
</style>
