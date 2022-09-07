FROM node:alpine

RUN mkdir -p /app
ENV PORT 3000

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install
RUN yarn add next@canary --force

COPY . /app

EXPOSE 3000
CMD [ "yarn", "dev" ]