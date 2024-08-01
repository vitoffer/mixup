<script setup>
import { onMounted, ref } from "vue"

const block = ref()

const styles = ref()
onMounted(() => {
	styles.value = {
		height: block.value.previousSibling.getBoundingClientRect().height + "px",
	}
})
</script>

<template>
	<div
		ref="block"
		class="w-100%"
		:style="styles"
	></div>
</template>
