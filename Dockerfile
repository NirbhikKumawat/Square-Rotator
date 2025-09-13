FROM node:20-slim
LABEL authors="Nirbhik The Nice"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
ENTRYPOINT ["npm","run","dev"]