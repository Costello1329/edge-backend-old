# Build
FROM node:latest
COPY . .
RUN npm install && npm run build

# Deploy
FROM node:alpine
COPY --from=0 /dist/src/ /src
COPY --from=0 /package.json .
COPY --from=0 /config.json .
RUN npm install --only=prod
CMD ["node", "src/index.js"]