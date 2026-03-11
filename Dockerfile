# Use the official Node.js 18 image as the base
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Debug: List contents of se_project_express to verify files are present
RUN ls -l /usr/src/app/se_project_express

# Expose the port Cloud Run will use
EXPOSE 8080

# Set the environment variable PORT to 8080 (Cloud Run sets this, but this is a fallback)
ENV PORT=8080

# Start the server (update to your main file if not server.js)
CMD ["node", "se_project_express/server.js"]
