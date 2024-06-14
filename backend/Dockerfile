# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --production

# Copy the source code
COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json ./

# Set build-time argument and environment variable
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Set environment variables
ENV NODE_ENV production

# Run Prisma migrations
RUN bun run prisma migrate deploy

# Generate Prisma client
RUN bun run prisma generate

# Command to run the application
CMD ["bun", "src/index.ts"]

# Expose the port
EXPOSE 8080
