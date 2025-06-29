# Этап сборки
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Этап запуска
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --production --legacy-peer-deps
EXPOSE 3000
CMD ["node", "dist/main.js"]