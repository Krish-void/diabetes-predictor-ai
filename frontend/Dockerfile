# ==== STAGE 1: Build the React Application ====
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package descriptors 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the production React Application
RUN npm run build

# ==== STAGE 2: Serve with Nginx ====
FROM nginx:alpine

# Copy the built files from Stage 1 into Nginx's default HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# We need custom Nginx configuration to handle React SPA routing (preventing 404s on refresh) and proxy API calls
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
