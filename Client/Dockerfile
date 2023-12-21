FROM node

WORKDIR /Client

COPY package.json .

RUN npm install

COPY . .

CMD ["npm","run","dev"]