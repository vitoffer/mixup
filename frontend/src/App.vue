<script setup lang="ts">
import { RouterView } from "vue-router"
import AppNav from "./components/AppNav.vue"
import { watch } from "vue"
import { storeToRefs } from "pinia"
import { useToast } from "primevue"
import { useToastStore } from "./stores/toastStore"
import { useUserStore } from "./stores/userStore"

const toast = useToast()
const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)

const { checkAuth } = useUserStore()
localCheckAuth()

async function localCheckAuth() {
	if (!(await checkAuth())) {
		toastStore.addToast({
			summary: "Ошибка авторизации. Пожалуйста, войдите снова",
		})
	}
}

watch(
	toasts,
	(newToasts) => {
		newToasts.forEach((toastMessage) => {
			toast.add(toastMessage)
			toastStore.deleteToast(toastMessage.id)
		})
	},
	{ deep: true },
)
</script>

<template>
	<Toast />
	<div class="mb-[52px]">
		<RouterView />
	</div>
	<AppNav />
</template>

<style>
@reference "./assets/styles/main.css";

.p-toast {
	@apply top-4 right-4 w-[358px];
}

.p-toast-message {
	@apply mb-2 rounded-[10px] bg-gray-600/40 p-4 backdrop-blur-md;
}

.p-toast-message-content {
	@apply flex justify-between opacity-100;
}

.p-toast-close-button {
	@apply leading-0 outline-0;
}

.p-toast-close-icon {
	@apply h-5 w-5 text-lg;
}

.p-toast-message-icon {
	@apply hidden;
}

.p-toast-detail {
	@apply leading-5 whitespace-pre;
}
</style>
