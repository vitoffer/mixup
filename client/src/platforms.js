import youtubeLogo from "@/assets/images/youtube_logo.svg"
import spotifyLogo from "@/assets/images/spotify_logo.svg"
import vkLogo from "@/assets/images/vk_logo.svg"
import yandexLogo from "@/assets/images/yandex_logo.svg"

export function getPlatformLogo(platform) {
	switch (platform) {
		case "youtube":
			return youtubeLogo
		case "spotify":
			return spotifyLogo
		case "vk":
			return vkLogo
		case "yandex":
			return yandexLogo
	}
}

export function getPlatformLink(track, platform) {
	return track.platformLinks[platform] || "/"
}
