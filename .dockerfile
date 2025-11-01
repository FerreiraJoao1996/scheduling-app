FROM node:24-alpine AS builder

WORKDIR /scheduling-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /scheduling-app

COPY --from=builder /scheduling-app/dist ./dist
COPY --from=builder /scheduling-app/package*.json ./
# COPY --from=builder /scheduling-app/.env ./

RUN npm install

EXPOSE 3333

CMD ["node", "dist/index.js"]
