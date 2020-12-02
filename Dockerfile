FROM node:14-alpine AS build

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY . ./

RUN yarn run tsc


FROM node:14-alpine

ENV TZ=Etc/UTC

RUN apk update \
    && apk add --no-cache ca-certificates tzdata \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn --prod

COPY --from=build /dist ./

CMD ["node", "./index.js"]
