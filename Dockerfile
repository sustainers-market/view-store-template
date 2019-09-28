FROM node:10
WORKDIR /usr/src/app

COPY package*.yaml package*.json ./

ARG skipPackageConvert

RUN if [ "$skipPackageConvert" = "true" ]; then echo Skipping package yaml to json conversion; else npm install -g any-json && any-json package.yaml package.json; fi

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]