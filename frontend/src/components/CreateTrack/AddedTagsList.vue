<script setup lang="ts">
defineProps<{
	tags: string[]
}>()

defineEmits<{
	removeTag: [tag: string]
}>()
</script>

<template>
	<ul class="flex flex-wrap gap-1">
		<li v-for="tag in tags">
			<div
				class="flex items-center justify-center gap-1.5 rounded-full bg-gray-800 px-3 py-2.5 text-cyan-700"
			>
				<span>{{ tag }}</span>
				<button
					@click="$emit('removeTag', tag)"
					class="cursor-pointer"
				>
					<span class="hidden">Удалить тег</span>
					<i class="pi pi-times"></i>
				</button>
			</div>
		</li>
	</ul>
</template>

<style scoped></style>
