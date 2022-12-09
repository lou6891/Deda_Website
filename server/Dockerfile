FROM node:16.17.0-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app
COPY . .
RUN npm install
USER node
CMD ["node", "index.js"]