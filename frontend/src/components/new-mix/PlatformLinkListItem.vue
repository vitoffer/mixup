<script setup>
defineProps({
	track: {
		type: Object,
		required: true,
		validator(track) {
			return (
				typeof track.name === "string" &&
				track.authors.every((author) => typeof author === "string")
			)
		},
	},
})
</script>

<template>
	<article
		class="select-option__wrapper"
		v-tooltip="{
			value: `${track.name} - ${track.authors.join(', ')}`,
		}"
	>
		<a
			:href="track.link"
			target="_blank"
			class="select-option__image-link"
		>
			<img
				:src="track.imageUrl"
				alt="Track image"
				width="64"
				class="select-option__image"
			/>
		</a>
		<div class="select-option__info option-info">
			<p class="option-info__name">{{ track.name }}</p>
			<p class="option-info__authors">{{ track.authors.join(", ") }}</p>
		</div>
	</article>
</template>

<style>
.p-select-list-container {
	max-height: initial !important;
}
</style>

<style scoped>
.select-option__wrapper {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 8px;
}

.option-info__name {
	font-size: 18px;
	color: var(--yellow-900);
}

.option-info__authors {
	font-size: 16px;
	color: var(--yellow-700);
}
</style>
