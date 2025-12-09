# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Declare build argument
ARG VITE_PAGE_URL
ENV VITE_PAGE_URL=${VITE_PAGE_URL}

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy build output to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
