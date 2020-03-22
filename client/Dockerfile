### Build ###
FROM node:12.7 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
#RUN npm run build --prod
RUN $(npm bin)/ng build --prod


### Run ###
FROM nginx:1.17.1
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY ./docker_content/default.conf /etc/nginx/conf.d/
COPY ./docker_content/entryPoint.sh /
RUN chmod +x /entryPoint.sh
ENTRYPOINT ["/entryPoint.sh"]
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;'"]
#CMD ["/bin/sh", "-c", "/entryPoint.sh && exec nginx -g 'daemon off;'"]

