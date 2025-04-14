import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { jwtDecode } from "jwt-decode"
import { Role, UserJWTPayload } from "@/types"

export const useUserStore = defineStore(
	"user",
	() => {
		const token = ref<string | null>(null)

		const info = computed<UserJWTPayload | null>(() =>
			token.value ? jwtDecode(token.value) : null,
		)

		function checkAuth() {
			if (info.value === null) {
				return false
			}
			return true
		}

		function checkRole(requiredRoles: Role[]) {
			if (!checkAuth()) {
				return false
			}
			return requiredRoles.includes((info.value as UserJWTPayload).role)
		}

		return { token, info, checkAuth, checkRole }
	},
	{
		persist: true,
	},
)
