<script setup>
defineProps(["platform"])
</script>

<template>
	<li :class="`${platform.platform == 'discord' ? 'ml-auto' : ''}`">
		<a
			class="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] shadow-link"
			:href="platform.link"
		>
			<img
				:class="`w-[22px] ${platform.platform == 'discord' ? '' : 'translate-x-[0.5px]'}`"
				:src="`/src/assets/images/${platform.platform}_logo.svg`"
				alt="Platform logo"
			/>
		</a>
	</li>
</template>
