<script setup>
import UtilityButton from "@/components/utilities/UtilityButton.vue"
import TitleText from "./TitleText.vue"
import { PlayIcon } from "@heroicons/vue/24/solid"
</script>

<template>
	<div>
		<TitleText />
		<UtilityButton
			color="red"
			:is-solid="true"
		>
			<PlayIcon style="width: 16px; color: var(--bg-color)" />
			<span class="font-bold">Бот в дискорде</span>
		</UtilityButton>
	</div>
</template>
