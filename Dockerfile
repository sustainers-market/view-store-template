FROM node:10
WORKDIR /usr/src/app

RUN npm install -g any-json 
RUN any-json package.yaml package.json

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]