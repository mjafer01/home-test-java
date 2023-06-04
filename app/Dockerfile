
FROM node:16-buster-slim as build
WORKDIR /app
COPY . .
RUN apt update && apt install -y firefox-esr
RUN rm -rf dist
RUN yarn install
RUN yarn lint
RUN REACT_APP_REST_API_URL=server yarn build-dev
RUN mkdir -p build/
RUN cp -r dist/* build
RUN cp -r public/static.json ../build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]