FROM node:alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm build


FROM nginx:alpine

RUN apk add --no-cache gettext

COPY --from=build /app/dist /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.template.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["nginx", "-g", "daemon off;"]
