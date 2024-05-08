FROM node:20 as build-stage
WORKDIR /app
COPY ./ .
COPY package.json .
RUN npm i -g @nestjs/cli
RUN yarn install
RUN npm run build

FROM node:20 as prod
WORKDIR /app
COPY --from=build-stage /app/apps/webapp/client/dist ./apps/webapp/client/dist/

COPY --from=build-stage /app/package* ./
COPY --from=build-stage /app/node_modules ./node_modules/
COPY --from=build-stage /app/dist ./dist/

WORKDIR /app

CMD npm run start:prod
