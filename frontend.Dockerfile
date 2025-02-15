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

# Expose the correct port
ARG PORT=5173
ENV PORT=$PORT
EXPOSE $PORT

# Start Vite in preview mode with explicit port
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port $PORT"]
