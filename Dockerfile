# Use a Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) files
COPY package*.json ./

# Install the project's dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Expose the port your application will use
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
