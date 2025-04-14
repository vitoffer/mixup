import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { jwtDecode } from "jwt-decode"
import { getMe } from "@/api/auth"
import { Role, UserJWTPayload } from "@/types"

export const useUserStore = defineStore(
	"user",
	() => {
		const token = ref<string | null>(null)

		const info = computed<UserJWTPayload | null>(() =>
			token.value ? jwtDecode(token.value) : null,
		)

		async function checkRole(requiredRoles: Role[]) {
			if (info.value === null) {
				return false
			}
			return requiredRoles.includes(info.value.role)
		}

		return { token, info, checkRole }
	},
	{
		persist: true,
	},
)
