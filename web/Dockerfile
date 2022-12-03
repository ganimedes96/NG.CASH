FROM node:alpine

# Run and expose the server on port 3001
EXPOSE 3000


WORKDIR /app-frontend

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install

# generated prisma files
ADD . /app-frontend

# A command to start the server
CMD npm start