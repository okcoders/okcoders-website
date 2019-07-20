FROM node:11-alpine

RUN apk update && apk add --no-cache git python make g++

COPY . /app
WORKDIR /app
RUN cd server && rm -rf node_modules && cd ../client && rm -rf node_modules
RUN npm run install-all
RUN npm run build

EXPOSE 9000

CMD npm start


