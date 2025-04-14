import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi"
import { Schema } from "hono"
import { PinoLogger } from "hono-pino"

export interface AppBindings {
	Variables: {
		logger: PinoLogger
	}
}

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	AppBindings
>
