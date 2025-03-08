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

COPY --from=build /app/dist /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.template.conf

CMD /bin/sh -c "envsubst '\$BACKEND_PORT' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'
