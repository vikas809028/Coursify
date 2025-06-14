# frontend/Dockerfile

# Stage 1: Build app
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .

# Increase Node.js memory limit to prevent out-of-memory error
ENV NODE_OPTIONS=--max-old-space-size=1024

RUN npm install
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
