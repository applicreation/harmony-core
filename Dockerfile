FROM node:lts-alpine AS builder

WORKDIR /app

COPY ./app /app

RUN npm install && npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/build /app
COPY --from=builder /app/package.json /app
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node", "index.js"]
