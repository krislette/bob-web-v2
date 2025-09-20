# Base image
FROM node:24-alpine

# Set working dir
WORKDIR /app

# Copy package to the image
COPY package*.json .

# Install all dependencies
RUN npm install

# Copy all files to the workdir
COPY . .

# Export React port number
EXPOSE 5173

# Run a command to start the app inside container
CMD ["npm", "run", "dev"]
