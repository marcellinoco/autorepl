FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY prisma prisma
COPY tsconfig.json .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ENV NODE_ENV production
RUN bun run prisma:migrate
RUN bun run prisma generate

CMD ["bun", "src/index.ts"]

EXPOSE 3000