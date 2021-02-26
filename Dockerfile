FROM node:14.15.4-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["node", "server.js"]