### Build ###
FROM node:12.7 AS build
WORKDIR /usr/src/app
COPY client/package.json ./
RUN npm install
COPY client/ .
RUN npm run build --prod


### Run ###
FROM nginx:1.17.1
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html
