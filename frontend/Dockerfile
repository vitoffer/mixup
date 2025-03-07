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

COPY nginx.conf /etc/nginx/

COPY --from=build /app/dist /etc/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
