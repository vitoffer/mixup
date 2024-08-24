import { reactive } from "vue"

export const trackList = reactive([
	{
		_id: "66b60e3a4d942807aaa50898",
		name: "Название",
		authors: ["author1", "author2"],
		imageName: "66b60e3a4d942807aaa50898.jpeg",
	},
	{
		_id: "66b6213fcd5def40e1fdf248",
		name: "title",
		authors: ["au22", "bb123"],
		imageName: "66b6213fcd5def40e1fdf248.jpeg",
	},
])

export function addTrackToList(track) {
	trackList.push(track)
}
