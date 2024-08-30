FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
