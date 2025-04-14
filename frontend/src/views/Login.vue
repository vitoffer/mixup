<script setup lang="ts">
import { login } from "@/api/auth"
import { useToastStore } from "@/stores/toastStore"
import { useUserStore } from "@/stores/userStore"
import { ref } from "vue"
import { useRouter } from "vue-router"

const toastStore = useToastStore()
const router = useRouter()
const userStore = useUserStore()

const username = ref("")
const password = ref("")

async function localLogin() {
	const trimmedUsername = username.value.trim()
	const trimmedPassword = password.value.trim()

	if (trimmedUsername.length === 0) {
		toastStore.addToast({ summary: "Введите username" })
		return
	}
	if (trimmedPassword.length === 0) {
		toastStore.addToast({ summary: "Введите пароль" })
		return
	}

	if (await login(trimmedUsername, trimmedPassword)) {
		router.push({ name: "trackList" })
		return
	}

	toastStore.addToast({ summary: "Login error" })
}

function logout() {
	userStore.token = null
}
</script>

<template>
	<form
		@submit.prevent
		class="mt-[calc(50vh-24px)] flex h-full -translate-y-1/2 flex-col items-center gap-4"
	>
		<template v-if="!userStore.token">
			<h1 class="text-center text-xl font-bold">
				Вход только для модераторов и администраторов
			</h1>
			<div class="flex w-2/3 flex-col gap-2">
				<input
					autocomplete="username"
					v-model="username"
					type="text"
					placeholder="Username"
					class="p-2"
				/>
				<input
					autocomplete="current-password"
					v-model="password"
					type="password"
					placeholder="Пароль"
					class="p-2"
				/>
			</div>
		</template>
		<div class="flex gap-6">
			<button
				v-if="!userStore.token"
				@click="localLogin"
				class="rounded-[10px] bg-yellow-800 px-4 py-3 font-bold text-gray-900"
			>
				Войти
			</button>
			<button
				v-else
				@click="logout"
				class="rounded-[10px] border border-cyan-700 px-4 py-3 font-bold text-cyan-700"
			>
				Выйти
			</button>
		</div>
	</form>
</template>

<style scoped></style>
