FROM node:16.10.0

WORKDIR /usr/src/app
EXPOSE 10200

COPY dist dist
COPY public public
COPY package.json ./package.json
COPY clg.json ./clg.json

RUN npm install --save --legacy-peer-deps

CMD ["npm", "run", "start"]
