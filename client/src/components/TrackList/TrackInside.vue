<script setup>
defineProps(["track"])
</script>

<template>
	<li class="flex max-w-256px items-center justify-center">
		<div
			class="custom-list-marker relative inline-block max-w-256px overflow-hidden text-ellipsis whitespace-nowrap pl-[10px]"
		>
			{{ $props.track }}
		</div>
	</li>
</template>
