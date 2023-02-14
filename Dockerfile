FROM node:16-alpine
WORKDIR /user/src/app

RUN mkdir -p /data/db/

    
COPY package*.json ./

COPY src src
COPY tsconfig*.json nest-cli.json ./

RUN npm i
RUN npm run build

COPY config config
RUN mkdir -p /tmp/MY-FILES
EXPOSE 3000
CMD ["node", "dist/main.js"]


