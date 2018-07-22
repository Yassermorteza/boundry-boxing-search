FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install -g  nodemon

RUN npm install

COPY . /app

Expose 5000

CMD ["nodemon"]