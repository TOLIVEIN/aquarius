# syntax = docker/dockerfile:experimental
FROM node:alpine as builder

WORKDIR /aquarius

RUN curl -L https://pnpm.js.org/pnpm.js | node - add --global pnpm

COPY ./package.json /aquarius

RUN --mount=type=cache,target=/aquarius/node_modules,id=aquarius_node_modules,sharing=locked \
        pnpm i

COPY ./ /aquarius

RUN --mount=type=cache,target=/aquarius/node_modules,id=aquarius_node_modules,sharing=locked \
        pnpm run build


FROM nginx:alpine

COPY --from=builder /aquarius/dist /usr/share/nginx/html

COPY aquarius.nginx.conf /etc/nginx/conf.d/aquarius.nginx.conf