FROM node:19-alpine

WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend code
COPY frontend/ .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE $PORT

# Command to run the app
CMD npm run preview -- --host --port $PORT