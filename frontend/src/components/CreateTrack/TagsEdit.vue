<script setup lang="ts">
import AddedTagsList from "./AddedTagsList.vue"
import NewTagInput from "./NewTagInput.vue"

defineProps<{
	tags: string[]
}>()

defineEmits<{
	removeTag: [tag: string]
	addInputTag: []
}>()

const inputTagText = defineModel<string>("inputTagText")
</script>

<template>
	<div class="flex w-full flex-col gap-2">
		<p class="text-bold mb-1 text-lg leading-none text-yellow-700">Теги:</p>
		<AddedTagsList
			v-if="tags.length"
			:tags="tags"
			@remove-tag="(tag) => $emit('removeTag', tag)"
		/>
		<p
			v-else
			class="text-[0.875rem] text-cyan-700"
		>
			Пока нет тегов. Добавьте первый (если нужно) ниже
		</p>
		<NewTagInput
			v-model:input-tag-text="inputTagText"
			@add-input-tag="$emit('addInputTag')"
		/>
	</div>
</template>

<style scoped></style>
