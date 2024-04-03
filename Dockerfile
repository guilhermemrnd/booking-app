# Stage 1: Build
FROM node:18-alpine as build-stage
RUN npm install -g pnpm

WORKDIR /app
COPY . .

WORKDIR /app/frontend
RUN pnpm install && pnpm build

WORKDIR /app/backend
RUN pnpm install && pnpm build

# Stage 2: Runtime
FROM node:18-alpine as runtime-stage
RUN npm install -g pnpm

WORKDIR /app
COPY --from=build-stage /app/backend /app/backend
COPY --from=build-stage /app/frontend/dist /app/frontend/dist

WORKDIR /app/backend

EXPOSE 7000

CMD ["pnpm", "start"]
