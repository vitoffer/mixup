<script setup>
defineProps(["isSolid", "color"])
</script>

<template>
	<button
		:class="`button button--${$props.color} button--${$props.isSolid ? 'solid' : 'outline'}`"
	>
		<slot />
	</button>
</template>
