import { MixTrack, Track } from "@/types"
import axios from "axios"
import { Ref, ref } from "vue"

export async function loadTracks() {
	const { data } = await axios.get(
		`${import.meta.env.VITE_BASE_API_URL}/tracks`,
	)

	interface TrackFromApi extends Omit<MixTrack, "id" | "originalTracks"> {
		_id: string
		__v: number
		createdAt: string
		originalTracks: object[]
		updatedAt: string
	}

	const tracksFromApiList = data.map((track: TrackFromApi) => {
		const {
			_id,
			__v,
			createdAt,
			updatedAt,
			originalTracks,
			...otherTrackData
		} = track

		return { ...otherTrackData, id: _id, originalTracks }
	})

	// const data: Partial<Track>[] = [
	// 	{
	// 		id: "1",
	// 		title: "Track 1 super class",
	// 		artistsNames: ["author1"],
	// 		thumbnailUrl:
	// 			"https://image.winudf.com/v2/image/Y29tLnRyYWNrLm11c2ljdHJhY2ttdXNpY19zY3JlZW5fMV9zcnc3eDF0Mg/screen-1.jpg?fakeurl=1&amp;type=.jpg",
	// 	},
	// 	{
	// 		id: "2",
	// 		title: "Track 2",
	// 		artistsNames: [
	// 			"author2",
	// 			"1231421",
	// 			"pupuasfffffffffffffasfffasfafffffffff",
	// 		],
	// 		thumbnailUrl:
	// 			"https://i.pinimg.com/originals/96/05/59/960559700cb774386fadf0d4284a728f.jpg",
	// 	},
	// ]

	return tracksFromApiList
}

export const trackList: Ref<Track[]> = ref([])
