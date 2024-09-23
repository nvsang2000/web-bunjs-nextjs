# Sử dụng hình ảnh Bun.js chính thức
FROM oven/bun:1 AS base

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép các file cần thiết để xây dựng ứng dụng
COPY package.json bun.lockb ./
COPY prisma ./prisma
COPY .env ./
COPY next.config.js ./ 
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

# Cài đặt các package và thiết lập Prisma client
RUN bun install
RUN npx prisma generate

# Build Next.js cho production
RUN bun run build

# Mở cổng ứng dụng Next.js
EXPOSE 3000

# Lệnh khởi động ứng dụng Next.js
CMD ["bun", "run", "start"]
