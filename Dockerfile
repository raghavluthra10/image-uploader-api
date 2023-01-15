FROM node:18-alpine

WORKDIR /app

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN npm install pnpm -g
RUN npm i typescript -g
RUN pnpm install

COPY . .

RUN pnpm run both:install
RUN pnpm run client:build

CMD ["pnpm", "start"]

EXPOSE 8000