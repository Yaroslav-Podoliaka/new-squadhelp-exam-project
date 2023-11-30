ARG VERSION=18-alpine

FROM node:$VERSION

ARG NODE_ENV="development"

RUN mkdir ./client

WORKDIR /client

# COPY package*.json ./

COPY . .

EXPOSE 3000

RUN npm install && chown -R node:node /client/node_modules

CMD npm start
