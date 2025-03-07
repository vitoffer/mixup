FROM node:alpine AS build

WORKDIR /app

COPY ../frontend/package*.json ../frontend/yarn.lock ./

RUN yarn install

COPY ../frontend/ ./

RUN yarn build


FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/

COPY --from=build /app/dist /etc/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
