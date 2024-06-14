FROM imbios/bun-node

WORKDIR /app

COPY package.json .
COPY bun.lockb .

COPY src src
COPY prisma prisma
COPY tsconfig.json .

RUN bun install --production

ENV NODE_ENV production
CMD bun start

EXPOSE 8080
