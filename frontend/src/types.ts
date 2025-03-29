export type Platform = "spotify" | "youtubeMusic" | "yandexMusic"

export interface OriginalTrack {
	id: string
	title: string
	urls: Record<Platform, string | null>
	thumbnailUrl: string
	artistsNames: string[]
	tags: string[]
	isMix: boolean
}

export type MixTrack = OriginalTrack & {
	originalTracks: OriginalTrack[]
}

export type Track = OriginalTrack | MixTrack

export interface CreateTrackPlatformTab {
	platform: Platform
	link: string
	icon: string
	placeholder: string
}
