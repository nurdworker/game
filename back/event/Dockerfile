FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY . .

CMD ["/wait-for-it.sh", "kafka:9092", "--", "npm", "run", "start:dev"]