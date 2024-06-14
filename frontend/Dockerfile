FROM node:20.10.0-alpine3.19

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm i -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]