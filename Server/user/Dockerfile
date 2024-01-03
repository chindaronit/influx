FROM node

WORKDIR /user

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]
