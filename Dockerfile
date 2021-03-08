# syntax = docker/dockerfile:experimental
FROM node:alpine as builder

WORKDIR /aquarius

COPY ./package.json /aquarius

RUN --mount=type=cache,target=/aquarius/node_modules,id=aquarius_node_modules,sharing=locked \
    yarn

COPY ./ /aquarius

RUN --mount=type=cache,target=/aquarius/node_modules,id=aquarius_node_modules,sharing=locked \
    yarn build


FROM nginx:alpine

COPY --from=builder /aquarius/dist /usr/share/nginx/html

COPY aquarius.nginx.conf /etc/nginx/conf.d/aquarius.nginx.conf