# Start up a Development server. Please use nginx and use `npm run build` for production (Dockerfile.prod).
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy application files
COPY ./ ./

# Run the application using the development server (port 3000)
CMD ["npm", "run", "start"]
