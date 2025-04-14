import { CreateTrackPlatformTab } from "@/types"
import spotifyIcon from "../assets/icons/spotify_logo.svg?url"
import yandexMusicIcon from "../assets/icons/yandexMusic_logo.svg?url"
import youtubeMusicIcon from "../assets/icons/youtubeMusic_logo.svg?url"

export const tabs: CreateTrackPlatformTab[] = [
	{
		platform: "youtubeMusic",
		link: "",
		icon: youtubeMusicIcon,
		placeholder: "Ссылка на youtube",
	},
	{
		platform: "spotify",
		link: "",
		icon: spotifyIcon,
		placeholder: "Ссылка на spotify",
	},
	{
		platform: "yandexMusic",
		link: "",
		icon: yandexMusicIcon,
		placeholder: "Ссылка на яндекс музыку",
	},
]
