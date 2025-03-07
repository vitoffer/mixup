FROM oven/bun:1-slim AS base

WORKDIR /app

COPY package*.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

EXPOSE 4000

ENTRYPOINT [ "bun", "run", "src/index.ts" ]
