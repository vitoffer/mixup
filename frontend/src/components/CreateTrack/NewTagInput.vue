<script setup lang="ts">
defineEmits<{
	addInputTag: []
}>()

const inputTagText = defineModel<string>("inputTagText")
</script>

<template>
	<div class="flex gap-2 rounded-[10px] bg-gray-800">
		<FloatLabel
			variant="in"
			class="w-full"
		>
			<InputText
				type="text"
				placeholder=""
				class="w-full px-3 py-2.5 text-cyan-700 placeholder:text-cyan-800"
				@change="$emit('addInputTag')"
				v-model="inputTagText"
				id="addTag"
			></InputText>
			<label for="addTag">Тег</label>
		</FloatLabel>
		<button
			class="rounded-r-[10px] bg-green-900 px-2.5 text-2xl leading-0 text-gray-900"
			@click="$emit('addInputTag')"
		>
			+
		</button>
	</div>
</template>

<style scoped></style>
