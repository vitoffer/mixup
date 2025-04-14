<script setup lang="ts">
import { registerModerator } from "@/admin/regModer"
import { login } from "@/api/auth"
import { useToastStore } from "@/stores/toastStore"
import { ref } from "vue"

const toastStore = useToastStore()

const username = ref("")
const password = ref("")
const repeatPassword = ref("")

async function localRegisterModerator() {
	const trimmedUsername = username.value.trim()
	const trimmedPassword = password.value.trim()
	const trimmedRepeatPassword = repeatPassword.value.trim()

	if (trimmedUsername.length === 0) {
		toastStore.addToast({ summary: "Введите username" })
		return
	}

	if (trimmedPassword.length === 0) {
		toastStore.addToast({ summary: "Введите пароль" })
		return
	}

	if (trimmedPassword !== trimmedRepeatPassword) {
		toastStore.addToast({ summary: "Пароли не совпадают" })
		return
	}

	if (await registerModerator(trimmedUsername, trimmedPassword)) {
		toastStore.addToast({ summary: "Успешно создан новый модератор" })
		username.value = ""
		password.value = ""
		repeatPassword.value = ""
		return
	}

	toastStore.addToast({ summary: "Register error" })
}
</script>

<template>
	<form
		@submit.prevent
		class="mt-[calc(50vh-24px)] flex h-full -translate-y-1/2 flex-col items-center gap-4"
	>
		<h1 class="text-center text-xl font-bold">Регистрация нового модератора</h1>
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
			<input
				autocomplete="current-password"
				v-model="repeatPassword"
				type="password"
				placeholder="Повторите пароль"
				class="p-2"
			/>
		</div>
		<div class="flex gap-6">
			<button
				@click="localRegisterModerator"
				class="rounded-[10px] bg-yellow-800 px-4 py-3 font-bold text-gray-900"
			>
				Зарегистрировать
			</button>
		</div>
	</form>
</template>

<style scoped></style>
