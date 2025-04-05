import { z } from "zod"
import {
	DbPopulatedTrackSchema,
	NormalizedPopulatedTrackSchema,
} from "../../models/Track"

export function normalizeTrack(
	track: z.infer<typeof DbPopulatedTrackSchema>
): z.infer<typeof NormalizedPopulatedTrackSchema> {
	const {
		_id: id,
		title,
		artistsNames,
		urls,
		thumbnailUrl,
		tags,
		originalTracks,
		isMix,
	} = track

	const normalizedTrack: z.infer<typeof NormalizedPopulatedTrackSchema> = {
		id: String(id),
		title,
		artistsNames,
		urls,
		thumbnailUrl,
		tags,
		originalTracks: [],
		isMix,
	}

	originalTracks.forEach((originalTrack) => {
		const { originalTracks, ...track } = originalTrack
		normalizedTrack.originalTracks.push(
			normalizeTrack({ ...track, originalTracks: [] })
		)
	})

	return normalizedTrack
}
