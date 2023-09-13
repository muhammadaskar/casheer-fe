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
# EXPOSE 2000

# # Perintah untuk menjalankan aplikasi saat container dijalankan
# CMD ["npm", "run", "preview", "--", "--port", "2000"]

FROM nginx:stable-alpine

# Copy the compiled from the build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# configure nginx
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf    

# Expose port 80 for the app
EXPOSE 2000

# Start the Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]