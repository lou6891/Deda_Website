FROM node:16.17.0-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
USER node
CMD ["npm", "start"]