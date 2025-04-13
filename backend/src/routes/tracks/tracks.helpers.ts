import { z } from "zod"
import {
	DbPopulatedTrackSchema,
	NormalizedPopulatedTrackSchema,
} from "../../models/Track"

export function normalizeTrack(
	track:
		| z.infer<typeof DbPopulatedTrackSchema>
		| Omit<
				z.infer<typeof DbPopulatedTrackSchema>,
				"__v" | "createdAt" | "updatedAt"
		  >
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
		const { _id, title, artistsNames, urls, thumbnailUrl, tags, isMix } =
			originalTrack

		const track: Omit<
			z.infer<typeof DbPopulatedTrackSchema>,
			"__v" | "createdAt" | "updatedAt"
		> = {
			_id,
			title,
			artistsNames,
			urls,
			thumbnailUrl,
			tags,
			isMix,
			originalTracks: [],
		}

		normalizedTrack.originalTracks.push(normalizeTrack(track))
	})

	return normalizedTrack
}
