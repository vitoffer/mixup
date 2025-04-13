import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore(
	"user",
	() => {
		const token = ref<string | null>(null)

		return { token }
	},
	{ persist: true },
)
