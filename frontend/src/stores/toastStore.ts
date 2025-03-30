import { defineStore } from "pinia"
import type { ToastMessageOptions } from "primevue"
import { ref } from "vue"

export const useToastStore = defineStore("toast", () => {
	const toasts = ref<(ToastMessageOptions & { id: number })[]>([])

	function addToast(toast: ToastMessageOptions) {
		toasts.value.push({
			...toast,
			id: Date.now(),
			life: 3000,
		})
	}

	function deleteToast(id: number) {
		toasts.value = toasts.value.filter((t) => t.id !== id)
	}

	return { toasts, addToast, deleteToast }
})
