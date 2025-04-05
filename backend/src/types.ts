import { z } from "zod"

export const PlatformSchema = z.enum(["spotify", "yandexMusic", "youtubeMusic"])
export type PlatformType = z.infer<typeof PlatformSchema>
