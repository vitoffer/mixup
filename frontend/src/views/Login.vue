<script setup lang="ts">
import { login } from "@/api/auth"
import { useToastStore } from "@/stores/toastStore"
import { ref } from "vue"
import { useRouter } from "vue-router"

const toastStore = useToastStore()
const router = useRouter()

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
</script>

<template>
	<input
		v-model="username"
		type="text"
		placeholder="Username"
	/>
	<input
		v-model="password"
		type="password"
		placeholder="Пароль"
	/>
	<button @click="localLogin">Войти</button>
</template>

<style scoped></style>
