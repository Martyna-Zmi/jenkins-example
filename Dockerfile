FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY app/ .

EXPOSE 3000
CMD ["npm", "start"]