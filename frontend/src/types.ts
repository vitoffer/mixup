import { JwtPayload } from "jwt-decode"

export type Platform = "spotify" | "yandexMusic" | "youtubeMusic"

export interface Track {
	id: string
	title: string
	urls: Record<Platform, string | null>
	thumbnailUrl: string
	artistsNames: string[]
	tags: string[]
	isMix: boolean
	originalTracks: Track[]
}

export interface CreateTrackPlatformTab {
	platform: Platform
	link: string
	icon: string
	placeholder: string
}

export interface TrackPlatformSearchResult {
	title: string
	url: string
	artistsNames: string[]
	thumbnailUrl: string
}

export interface UserJWTPayload extends JwtPayload {
	username: string
	role: Role
}

export type Role = "admin" | "moderator" | "user"
