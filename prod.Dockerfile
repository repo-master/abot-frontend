# Build Stage for building the React app for production
FROM node:18-alpine as build

WORKDIR /app

# Add the node_modules (that will be created soon) to PATH
ENV PATH=/app/node_modules/.bin:$PATH

# Build environment
ARG REACT_APP_API_ENDPOINT

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

# Copy app source
COPY . ./

# Build for production
RUN npm run build
