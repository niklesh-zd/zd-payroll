FROM node:16-alpine

WORKDIR /app

COPY package*.json  /app

RUN npm install

COPY . .

EXPOSE 7071

CMD [ "npm", "start" ]
