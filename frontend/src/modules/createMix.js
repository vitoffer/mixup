import { reactive, ref } from "vue"

export const foundTrackListByPlatform = ref({
	youtube: [],
	spotify: [],
	yandex: [],
	// youtube: [
	// 	{
	// 		id: "anLOn1B-6Ns",
	// 		name: "HISTED, TXVSTERPLAYA - MASHA ULTRAFUNK (Brazilian Funk + Phonk, Tik Tok Remix Viral 2024)",
	// 		authors: ["HISTED"],
	// 		link: "https://www.youtube.com/watch?v=anLOn1B-6Ns",
	// 		imageUrl: "https://i.ytimg.com/vi/anLOn1B-6Ns/mqdefault.jpg",
	// 	},
	// 	{
	// 		id: "vkBDkItNWVI",
	// 		name: "HISTED, TXVSTERPLAYA - MASHA ULTRAFUNK (PHONK)",
	// 		authors: ["The Vibe Guide"],
	// 		link: "https://www.youtube.com/watch?v=vkBDkItNWVI",
	// 		imageUrl: "https://i.ytimg.com/vi/vkBDkItNWVI/mqdefault.jpg",
	// 	},
	// 	{
	// 		id: "YZfRyu6ALAw",
	// 		name: "HISTED, TXVSTERPLAYA - MASHA ULTRAFUNK (SLOWED)",
	// 		authors: ["HISTED"],
	// 		link: "https://www.youtube.com/watch?v=YZfRyu6ALAw",
	// 		imageUrl: "https://i.ytimg.com/vi/YZfRyu6ALAw/mqdefault.jpg",
	// 	},
	// 	{
	// 		id: "nUdthjUMMIw",
	// 		name: "HISTED, TXVSTERPLAYA - MASHA ULTRAFUNK (Lyrics)",
	// 		authors: ["Pizza Music"],
	// 		link: "https://www.youtube.com/watch?v=nUdthjUMMIw",
	// 		imageUrl: "https://i.ytimg.com/vi/nUdthjUMMIw/mqdefault.jpg",
	// 	},
	// 	{
	// 		id: "2YFP099Z6mk",
	// 		name: "HISTED, TXVSTERPLAYA - MASHA ULTRAFUNK (SLOWED) vs HISTED, TXVSTERPLAYA - MASHA ULTRAFUNK",
	// 		authors: ["VSmusic"],
	// 		link: "https://www.youtube.com/watch?v=2YFP099Z6mk",
	// 		imageUrl: "https://i.ytimg.com/vi/2YFP099Z6mk/mqdefault.jpg",
	// 	},
	// ],
	// spotify: [
	// 	{
	// 		id: "5VZ0soW5syQfefCUj603DW",
	// 		name: "MASHA ULTRAFUNK",
	// 		authors: ["HISTED", "TXVSTERPLAYA"],
	// 		link: "https://open.spotify.com/track/5VZ0soW5syQfefCUj603DW",
	// 		imageUrl:
	// 			"https://i.scdn.co/image/ab67616d00001e0293942466c2c6ec14557522c6",
	// 	},
	// 	{
	// 		id: "7KXtGmAq1n6cQqFB1JeJVg",
	// 		name: "MASHA ULTRAFUNK - SLOWED",
	// 		authors: ["HISTED", "TXVSTERPLAYA"],
	// 		link: "https://open.spotify.com/track/7KXtGmAq1n6cQqFB1JeJVg",
	// 		imageUrl:
	// 			"https://i.scdn.co/image/ab67616d00001e0293942466c2c6ec14557522c6",
	// 	},
	// 	{
	// 		id: "0XiwITb3b83YjjxIZEgwiK",
	// 		name: "MASHA ULTRAFUNK - SPED UP",
	// 		authors: ["HISTED", "TXVSTERPLAYA"],
	// 		link: "https://open.spotify.com/track/0XiwITb3b83YjjxIZEgwiK",
	// 		imageUrl:
	// 			"https://i.scdn.co/image/ab67616d00001e0293942466c2c6ec14557522c6",
	// 	},
	// 	{
	// 		id: "06PqeO7IInus2yvzsZwZhf",
	// 		name: "CUTE DEPRESSED",
	// 		authors: ["Dyan Dxddy"],
	// 		link: "https://open.spotify.com/track/06PqeO7IInus2yvzsZwZhf",
	// 		imageUrl:
	// 			"https://i.scdn.co/image/ab67616d00001e02550c08bd67e6d175e2dc463b",
	// 	},
	// 	{
	// 		id: "0HUot1TF3h0CanzoqYAJlS",
	// 		name: 'Masha Ultrafunk (From "Masha and the Bear") [Music Box]',
	// 		authors: ["Club Unicorn"],
	// 		link: "https://open.spotify.com/track/0HUot1TF3h0CanzoqYAJlS",
	// 		imageUrl:
	// 			"https://i.scdn.co/image/ab67616d00001e02304a854758c4467e2fe477b5",
	// 	},
	// ],
	// yandex: [
	// 	{
	// 		id: 124241886,
	// 		name: "MASHA ULTRAFUNK",
	// 		authors: ["HISTED", "TXVSTERPLAYA"],
	// 		link: "https://music.yandex.ru/track/124241886",
	// 		imageUrl:
	// 			"https://avatars.yandex.net/get-music-content/6386858/3d5318fa.a.30445590-1/300x300",
	// 	},
	// 	{
	// 		id: 109975076,
	// 		name: "маша",
	// 		authors: ["ПОЛМАТЕРИ"],
	// 		link: "https://music.yandex.ru/track/109975076",
	// 		imageUrl:
	// 			"https://avatars.yandex.net/get-music-content/10139807/043d3eb1.a.27532032-1/300x300",
	// 	},
	// 	{
	// 		id: 88443083,
	// 		name: "Маша",
	// 		authors: ["Серега Пират"],
	// 		link: "https://music.yandex.ru/track/88443083",
	// 		imageUrl:
	// 			"https://avatars.yandex.net/get-music-content/5234847/5ef1d43a.a.17209635-1/300x300",
	// 	},
	// 	{
	// 		id: 124288919,
	// 		name: "Маша",
	// 		authors: ["провальный эксперимент"],
	// 		link: "https://music.yandex.ru/track/124288919",
	// 		imageUrl:
	// 			"https://avatars.yandex.net/get-music-content/10874616/db6e40ce.a.30465592-1/300x300",
	// 	},
	// 	{
	// 		id: 110313503,
	// 		name: "Маша",
	// 		authors: ["Рэйчи"],
	// 		link: "https://music.yandex.ru/track/110313503",
	// 		imageUrl:
	// 			"https://avatars.yandex.net/get-music-content/8871869/dc4fa78d.a.24487881-1/300x300",
	// 	},
	// ],
})

export const selectedTrackIdByPlatform = reactive({
	youtube: null,
	spotify: null,
	yandex: null,
	// youtube: "anLOn1B-6Ns",
	// spotify: "5VZ0soW5syQfefCUj603DW",
	// yandex: 124241886,
})
export const selectedTrackVkLink = ref(
	"",
	// "https://vk.com/audio791702532_456239231_d880706d1bb8e3bef7",
)

export function findTrackOnPlatforms(searchText) {
	selectedTrackIdByPlatform.youtube || findTrackOnYoutube(searchText)
	selectedTrackIdByPlatform.spotify || findTrackOnSpotify(searchText)
	selectedTrackIdByPlatform.yandex || findTrackOnYandex(searchText)
}

async function findTrackOnYoutube(searchText) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-youtube`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				searchText,
			}),
		},
	)

	const result = await response.json()

	foundTrackListByPlatform.value.youtube = result
}

async function findTrackOnSpotify(searchText) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-spotify`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				searchText,
			}),
		},
	)

	const result = await response.json()

	foundTrackListByPlatform.value.spotify = result
}

async function findTrackOnYandex(searchText) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/find-track-on-yandex`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				searchText,
			}),
		},
	)

	const result = await response.json()

	foundTrackListByPlatform.value.yandex = result
}
