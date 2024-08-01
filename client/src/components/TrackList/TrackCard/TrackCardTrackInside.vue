<script setup>
import EmptyBlock from "@/components/utilities/EmptyBlock.vue"
import { ref } from "vue"

defineProps(["track"])

const emptyBlock = ref(false)

function showFull() {
	emptyBlock.value = true
}

function hideFull() {
	emptyBlock.value = false
}
</script>

<template>
	<li
		class="max-w-256px overflow-hidden text-ellipsis whitespace-nowrap"
		@mouseover="showFull"
		@mouseout="hideFull"
	>
		&bull; {{ $props.track }}
	</li>
	<EmptyBlock v-if="emptyBlock" />
</template>
