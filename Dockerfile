# Use a lightweight image of Node.js to build the app
FROM node:16 as build

# # Set the working directory to /app
WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# # Install dependencies
RUN npm install --force

# # Copy the rest of the application code to the working directory
COPY . .

# # Build the Vue.js app for production
RUN npm run build

# Use a lightweight image of Nginx to serve the app
FROM nginx:stable-alpine

COPY nginx-conf/default.conf /etc/nginx/conf.d

# Expose port 80 for the app
EXPOSE 80/tcp

# Copy the compiled from the build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Start the Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
