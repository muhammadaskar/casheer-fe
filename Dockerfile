FROM node:16 as build

# Set working directory di dalam container
WORKDIR /app

# Copy the .env.example file to the container
COPY .env.example .env

# Tambahkan package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Tambahkan source code aplikasi
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Port yang akan digunakan untuk aplikasi
EXPOSE 2000

# Perintah untuk menjalankan aplikasi saat container dijalankan
CMD ["npm", "run", "dev"]
