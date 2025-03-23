export interface OriginalTrack {
	id: string
	title: string
	urls: {
		youtubeMusic: string | null
		yandexMusic: string | null
		spotify: string | null
	}
	thumbnailUrl: string
	artistsNames: string[]
	tags: string[]
	isMix: boolean
}

export type MixTrack = OriginalTrack & {
	originalTracks: OriginalTrack[]
}

export type Track = OriginalTrack | MixTrack
