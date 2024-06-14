FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --production

COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json ./

ENV NODE_ENV production

RUN bun run prisma migrate deploy

CMD ["bun", "src/index.ts"]

EXPOSE 8080
