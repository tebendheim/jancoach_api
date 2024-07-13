# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production
FROM node:18

WORKDIR /app

COPY --from=builder /app /app

RUN npm run build

CMD ["node", "dist/index.js"]