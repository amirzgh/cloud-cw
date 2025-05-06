# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code (JavaScript and HTML files)
COPY . .

# Expose port 8080 (Cloud Run listens on this port)
EXPOSE 8080

# Start the app using npm
CMD [ "npm", "start" ]
