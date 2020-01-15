FROM node:10
WORKDIR /usr/server
RUN npm i -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD [ "npm", "run" ,"dev" ]