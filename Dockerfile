FROM node:16-alpine

EXPOSE 4000

WORKDIR /usr/app/src/

COPY package*.json ./

RUN npm install 

RUN npm install -g ts-node

COPY . .

CMD ["npm", "start"]
