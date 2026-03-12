# Use the official Node.js 18 image as the base
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy backend package.json and package-lock.json
COPY se_project_express/package*.json ./se_project_express/

# Install backend dependencies
RUN cd se_project_express && npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port Cloud Run will use
EXPOSE 8080

# Set the environment variable PORT to 8080 (Cloud Run sets this, but this is a fallback)
ENV PORT=8080

# Start the server (update to your main file if not server.js)
CMD ["node", "se_project_express/server.js"]
