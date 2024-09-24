# 1. Sử dụng image Bun chính thức làm base image
FROM oven/bun:1 AS base

# 2. Tạo thư mục ứng dụng và chuyển vào thư mục đó
WORKDIR /app

# 3. Copy file `package.json` và `bun.lockb` (nếu có) vào container
COPY package.json bun.lockb* ./
COPY prisma ./prisma

# 4. Cài đặt dependencies bằng Bun
RUN bun install

# 5. Copy toàn bộ mã nguồn ứng dụng vào container
COPY . .

# 6. Build ứng dụng Next.js
RUN bun run build
RUN bun run postinstall

# 9. Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# 10. Chạy ứng dụng Next.js bằng Bun
CMD ["bun", "run", "start"]
