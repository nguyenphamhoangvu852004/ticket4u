# # Use the official Node.js image as the base image
# FROM node:22-alpine

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install the application dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Expose the application port
# EXPOSE 8087

# # Command to run the application
# CMD ["node", "dist/main.js"]

# --- Stage 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy file định nghĩa trước để cache
COPY package*.json ./

# Dùng npm ci để cài chính xác version và nhanh hơn
RUN npm ci

# Copy toàn bộ code và build
COPY . .
RUN npm run build

# --- Stage 2: Run (Gọn nhẹ, chạy Root) ---
FROM node:22-alpine AS runner

WORKDIR /app

# Thiết lập môi trường Production
ENV NODE_ENV=container

# Copy package để cài dependencies production
COPY package*.json ./

# 1. Chỉ cài thư viện cần chạy (bỏ devDependencies như typescript, eslint...)
# 2. Xóa cache npm cho nhẹ image
RUN npm ci --only=production && npm cache clean --force

# Copy code đã build từ Stage 1 sang (không copy folder src gốc)
COPY --from=builder /app/dist ./dist

EXPOSE 8087

# Chạy mặc định (quyền root)
CMD ["node", "dist/main.js"]