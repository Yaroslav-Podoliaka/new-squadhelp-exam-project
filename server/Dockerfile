ARG VERSION=18-alpine

FROM node:$VERSION

ARG NODE_ENV="development"

RUN mkdir /server && mkdir -p /public/images

RUN mkdir -p /var/www/html/images 

WORKDIR /server

COPY . .

RUN npm install && chown -R node:node /server/node_modules

COPY . .

EXPOSE 5000

CMD npm start
