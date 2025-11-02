FROM node:24-alpine AS builder

WORKDIR /scheduling-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild esbuild
RUN npm run build

FROM node:24-alpine AS runner

WORKDIR /scheduling-app

COPY --from=builder /scheduling-app/dist ./dist
COPY --from=builder /scheduling-app/package*.json ./

RUN npm install --omit=dev

EXPOSE 3333

CMD ["node", "dist/index.js"]
