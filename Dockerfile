# Stage 1: Build your Vite React app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy Vite's build output from /dist to nginx's html dir
COPY --from=build /app/dist /usr/share/nginx/html

# NGINX config for SPA routing support (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
