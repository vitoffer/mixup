<script setup>
import { RouterView } from "vue-router"
import TheHeader from "@/components/TheHeader.vue"
import { ref } from "vue"
import { onMounted } from "vue"

const pinged = ref(false)
const err = ref("")

const ping = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/ping`)
		pinged.value = true
	} catch (e) {
		err.value = e
	}
}

onMounted(ping)
</script>

<template>
	{{ pinged }}
	<br />
	{{ err }}
	<!-- <TheHeader />
	<RouterView /> -->
</template>
