FROM node:19-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend code
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE $PORT

# Command to run the app
CMD ["npm", "run", "preview"]