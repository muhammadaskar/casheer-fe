FROM node:16 as build

# Set working directory di dalam container
WORKDIR /app

# Copy the .env.example file to the container
COPY .env.example .env

ENV VITE_REACT_APP_BASE_URL=http://38.47.69.131:2020/api/v1/

# Tambahkan package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Tambahkan source code aplikasi
COPY . .

# Build aplikasi Next.js
RUN npm run build

FROM nginx:stable-alpine

# Copy the compiled from the build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# configure nginx
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf    


# Start the Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]