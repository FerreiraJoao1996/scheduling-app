FROM node:24-alpine AS builder

WORKDIR /order-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /order-app

COPY --from=builder /order-app/dist ./dist
COPY --from=builder /order-app/package*.json ./
# COPY --from=builder /order-app/.env ./

RUN npm install

EXPOSE 3333

CMD ["node", "dist/index.js"]
