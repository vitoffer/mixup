<script setup>
defineProps(["platform"])
</script>

<template>
	<li :class="`${Object.keys(platform)[0] == 'discord' ? 'ml-auto' : ''}`">
		<a
			class="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] shadow-link"
			:href="Object.values(platform)[0]"
		>
			<img
				:class="`w-[22px] ${Object.keys(platform)[0] == 'discord' ? '' : 'translate-x-[0.5px]'}`"
				:src="`/src/assets/images/${Object.keys(platform)[0]}_logo.svg`"
				alt="Platform logo"
			/>
		</a>
	</li>
</template>
