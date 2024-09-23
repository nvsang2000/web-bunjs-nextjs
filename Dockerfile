# Sử dụng hình ảnh Bun.js chính thức
FROM jarredsumner/bun:latest as build

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

# Giai đoạn thứ hai: chạy ứng dụng Next.js với phiên bản build
FROM jarredsumner/bun:latest

WORKDIR /app

# Sao chép từ giai đoạn build
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma

# Mở cổng ứng dụng Next.js
EXPOSE 3000

# Lệnh khởi động ứng dụng Next.js
CMD ["bun", "run", "start"]
