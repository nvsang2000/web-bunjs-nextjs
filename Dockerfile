# 1. Sử dụng image Bun chính thức làm base image
FROM jarredsumner/bun:latest as base

# 2. Tạo thư mục ứng dụng và chuyển vào thư mục đó
WORKDIR /app

# 3. Copy file `package.json` và `bun.lockb` (nếu có) vào container
COPY package.json bun.lockb* ./

# 4. Cài đặt dependencies bằng Bun
RUN bun install

# 5. Copy toàn bộ mã nguồn ứng dụng vào container
COPY . .

# 6. Build ứng dụng Next.js
RUN bun run build

# 7. Sử dụng lightweight image cho production
FROM jarredsumner/bun:latest as runner

WORKDIR /app

# 8. Copy kết quả build từ image base sang image runner
COPY --from=base /app /app

# 9. Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# 10. Chạy ứng dụng Next.js bằng Bun
CMD ["bun", "run", "start"]
