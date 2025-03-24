<script setup lang="ts">
import { RouterView } from "vue-router"
import AppNav from "./components/AppNav.vue"
import { watch } from "vue"
import { useGlobalStore } from "./stores/globalStore"
import { storeToRefs } from "pinia"
import { useToast } from "primevue"

const globalStore = useGlobalStore()
const { toasts } = storeToRefs(globalStore)
const toast = useToast()

watch(
	toasts,
	(newToasts) => {
		newToasts.forEach((toastMessage) => {
			toast.add(toastMessage)
			globalStore.deleteToast(toastMessage.id)
		})
	},
	{ deep: true },
)
</script>

<template>
	<div class="mb-[52px]">
		<RouterView />
	</div>
	<AppNav />
</template>
