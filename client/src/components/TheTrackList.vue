<script setup>
import TrackCard from "./TrackList/TrackCard.vue"

import image1Url from "@/assets/dev/card_image_1.jpg"
import image2Url from "@/assets/dev/card_image_2.jpg"
import image3Url from "@/assets/dev/card_image_3.jpg"
import image4Url from "@/assets/dev/card_image_4.jpg"
import image5Url from "@/assets/dev/card_image_5.jpg"

const trackList = [
	{
		id: 1,
		image: image1Url,
		title: "Биг Сити Лайф - Whole Lotta Swag",
		author: "author 1",
		tracksInside: ["Opsss 1 - Kent 1", "Track 1 - Lorem ipsum dolor sit."],
	},
	{
		id: 2,
		image: image2Url,
		title: "Vmeste My - 5sta Family, 6YNTHMANE, budAGE",
		author: "author 1",
		tracksInside: ["Track 1 - Kent 1", "Gooop - Lorem ipsum dolor sit amet."],
	},
	{
		id: 3,
		image: image3Url,
		title: "Supersonic - Big Baby Tape, Aarne",
		author: "author 2",
		tracksInside: ["Track 2 - Kent 2", "Track 22 - SSSAAA"],
	},
	{
		id: 4,
		image: image4Url,
		title: "Музыка громче - BUSHIDO ZHO",
		author: "author 4",
		tracksInside: ["Track 4 - Kent 1", "Track 2 - Kiii"],
	},
	{
		id: 5,
		image: image5Url,
		title: "далеко (большой Бушизм) [prod. by wex & heysubr] - BUSHIDO ZHO",
		author: "author 5",
		tracksInside: ["Track 5 - Kent 5", "Track 2 - Sawdadwadnfa ahsh"],
	},
]
</script>

<template>
	<main class="m-auto flex justify-center">
		<div class="grid grid-cols-[repeat(4,_min-content)] gap-[24px]">
			<TrackCard
				v-for="track in trackList"
				:key="track.id"
				:track="track"
			/>
		</div>
	</main>
</template>
