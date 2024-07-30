<script setup>
defineProps(["track"])
</script>

<template>
	<div
		class="flex w-[260px] flex-col items-center gap-[8px] rounded-[20px] bg-gray p-[16px] text-center shadow-card"
	>
		<img
			class="w-[228px]"
			:src="$props.track.image"
			alt="Card image"
		/>
		<div class="mb-[6px] flex flex-col gap-[4px]">
			<h2 class="line-clamp-2 text-[16px] text-yellow">
				{{ $props.track.title }}
			</h2>
			<p class="line-clamp-1 font-accent text-[12px] text-yellow-light">
				by {{ $props.track.author }}
			</p>
		</div>
		<ul class="w-[100%] list-inside list-disc text-[12px] text-cyan">
			<li
				class="overflow-hidden text-ellipsis whitespace-nowrap"
				v-for="trackInside in $props.track.tracksInside"
				:key="trackInside"
			>
				{{ trackInside }}
			</li>
		</ul>
		<button class="button button--red button--outline">
			Трек в дискорд боте
		</button>
	</div>
</template>
