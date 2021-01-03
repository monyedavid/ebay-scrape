FROM node

WORKDIR /home/node/naze

RUN npm i -g reflect-metadata

COPY ./package.json .

RUN yarn

COPY ./src ./src

COPY ./ormconfig.json .

COPY ./tsconfig.json .

COPY ./.env  .

RUN yarn build:server