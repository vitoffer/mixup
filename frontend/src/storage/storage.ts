import { Track } from "@/types"
import { Ref, ref } from "vue"

export const trackList: Ref<Track[]> = ref([])

export const foundTrackListByPlatform = ref({})

export const selectedTrackIdByPlatform = ref({})

export const selectedTrackVkLink = ref("")

export const selectedMixedTracksForNewMix = ref([])
