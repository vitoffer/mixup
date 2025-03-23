import { Track } from "@/types"
import { Ref, ref } from "vue"

export const trackList: Ref<Track[]> = ref([
	{
		id: "1",
		title: "Track 1 super class",
		artistsNames: ["author1"],
		thumbnailUrl:
			"https://image.winudf.com/v2/image/Y29tLnRyYWNrLm11c2ljdHJhY2ttdXNpY19zY3JlZW5fMV9zcnc3eDF0Mg/screen-1.jpg?fakeurl=1&amp;type=.jpg",
		urls: {
			spotify: "123",
			yandexMusic: null,
			youtubeMusic: null,
		},
		tags: ["Tag1"],
		isMix: false,
	},
	{
		id: "2",
		title: "Track 2",
		artistsNames: [
			"author2",
			"1231421",
			"pupuasfffffffffffffasfffasfafffffffff",
		],
		thumbnailUrl:
			"https://i.pinimg.com/originals/96/05/59/960559700cb774386fadf0d4284a728f.jpg",
		urls: {
			spotify: "123",
			yandexMusic: null,
			youtubeMusic: null,
		},
		tags: ["Tag1"],
		isMix: false,
		originalTracks: [
			{
				id: "1",
				title: "Track 1 super class",
				artistsNames: ["author1"],
				thumbnailUrl:
					"https://image.winudf.com/v2/image/Y29tLnRyYWNrLm11c2ljdHJhY2ttdXNpY19zY3JlZW5fMV9zcnc3eDF0Mg/screen-1.jpg?fakeurl=1&amp;type=.jpg",
				urls: {
					spotify: "123",
					yandexMusic: null,
					youtubeMusic: null,
				},
				tags: ["Tag1"],
				isMix: false,
			},
		],
	},
])

export const foundTrackListByPlatform = ref({})

export const selectedTrackIdByPlatform = ref({})

export const selectedTrackVkLink = ref("")

export const selectedMixedTracksForNewMix = ref([])
