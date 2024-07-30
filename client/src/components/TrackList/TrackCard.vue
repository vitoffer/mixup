<script setup>
defineProps(["track"])
</script>

<template>
	<div
		class="flex flex-col items-center gap-[8px] rounded-[20px] bg-gray p-[16px] text-center shadow-card"
	>
		<img
			:src="$props.track.image"
			alt="Card image"
			width="256"
		/>
		<div class="flex flex-col gap-[4px]">
			<h2 class="line-clamp-2 text-[18px] leading-[1.3] text-yellow">
				{{ $props.track.title }}
			</h2>
			<p
				class="line-clamp-1 font-accent text-[16px] leading-[1.3] text-yellow-light"
			>
				by {{ $props.track.author }}
			</p>
			<ul class="text-[14px] leading-[1.4] text-cyan-light">
				<li
					class="block"
					v-for="trackInside in $props.track.tracksInside"
					:key="trackInside"
				>
					<div
						class="custom-list-marker max-w-256px relative inline-block overflow-hidden text-ellipsis whitespace-nowrap pl-[10px]"
					>
						{{ trackInside }}
					</div>
				</li>
			</ul>
		</div>
		<div class="flex w-[100%] gap-[8px]">
			<a
				class="shadow-link flex h-[30px] w-[30px] items-center justify-center rounded-[8px]"
				v-for="platform in $props.track.platforms"
				:href="Object.values(platform)[0]"
				:key="platform"
			>
				<img
					class="w-[22px] translate-x-[0.5px]"
					:src="`/src/assets/images/${Object.keys(platform)[0]}_logo.svg`"
					alt="Platform logo"
				/>
			</a>
			<a
				href=""
				class="shadow-link ml-auto flex h-[30px] w-[30px] items-center justify-center rounded-[8px]"
			>
				<img
					class="w-[22px]"
					src="/src/assets/images/discord_logo.svg"
					alt="Discord logo"
				/>
			</a>
		</div>
	</div>
</template>

<style>
.custom-list-marker::before {
	content: "";
	width: 5px;
	aspect-ratio: 1;
	border-radius: 50%;
	position: absolute;

	left: 0;
	top: 50%;
	transform: translateY(-50%);
	@apply bg-cyan-light;
}
</style>
