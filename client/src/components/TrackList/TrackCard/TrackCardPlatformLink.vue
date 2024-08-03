<script setup>
defineProps(["platform"])
</script>

<template>
	<li :style="{ marginLeft: platform.platform == 'discord' ? 'auto' : '' }">
		<a
			class="platform-link"
			:href="platform.link"
		>
			<img
				class="platform-logo"
				:style="{ translate: platform.platform == 'discord' ? '' : '0.5px' }"
				:src="`/src/assets/images/${platform.platform}_logo.svg`"
				alt="Platform logo"
			/>
		</a>
	</li>
</template>

<style scoped>
.platform-link {
	display: flex;
	width: 30px;
	aspect-ratio: 1;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	box-shadow:
		0px 0px 4px 0px rgba(255, 226, 157, 0.8),
		0px 0px 4px 0px rgba(255, 226, 157, 0.8) inset;
}

.platform-logo {
	width: 22px;
}
</style>
