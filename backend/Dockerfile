FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY prisma prisma
COPY tsconfig.json .

ENV NODE_ENV production
RUN bun run prisma:migrate

CMD ["bun", "src/index.ts"]

EXPOSE 3000
