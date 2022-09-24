# syntax=docker/dockerfile:1
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "app"]
EXPOSE 3000