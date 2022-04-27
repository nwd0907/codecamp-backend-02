FROM node:14

WORKDIR /resource-service/
COPY ./package.json /resource-service/
COPY ./yarn.lock /resource-service/
RUN yarn install

COPY . /resource-service/
CMD yarn start:dev