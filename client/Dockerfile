FROM node:10
WORKDIR /usr/client
RUN npm install -g create-react-app@1.0.3
RUN npm install -g react-scripts
RUN npm i -g nodemon
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "start" ]