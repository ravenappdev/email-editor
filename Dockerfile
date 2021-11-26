# build environment
FROM node:13.12.0-alpine as build
ARG ENV
RUN mkdir -p /app 
WORKDIR /app
COPY package.json ./

COPY . ./

RUN npm install

RUN npm run react-build:${ENV}
RUN npm run build-server

# production environment
FROM build
EXPOSE 8080
CMD ["node","./server-build/index.js"]
