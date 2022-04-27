FROM node:14

WORKDIR /auth-service/
COPY ./package.json /auth-service/
COPY ./yarn.lock /auth-service/
RUN yarn install

COPY . /auth-service/
CMD yarn start:dev