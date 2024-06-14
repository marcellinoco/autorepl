FROM imbios/bun-node

WORKDIR /app

COPY . .
RUN bun install --production

ENV NODE_ENV production
CMD bun start

EXPOSE 8080
