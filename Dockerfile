FROM node:12.5-slim
WORKDIR /app
COPY . /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]
