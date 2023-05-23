# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server source code to the container
COPY . .

# Expose the port on which the server will run
EXPOSE 3000

# Start the server when the container starts
CMD ["node", "index.js"]
