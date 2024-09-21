FROM node:18

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

WORKDIR /app/apps/api

RUN yarn artifacts:build && yarn build

EXPOSE 4000

CMD ["yarn", "start"]
