# Step 1: Build the Vite app
FROM node:20-alpine AS build

# # Install git for git-based npm dependencies
# RUN apk add --no-cache git

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
# RUN npm run build

# Step 2: Serve with Nginx
# FROM nginx:stable-alpine

# # Copy build output to Nginx html folder
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy custom Nginx config for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0","--port","5173"]

#Commented out all proudction-related stuffs (serving static files with nginx)