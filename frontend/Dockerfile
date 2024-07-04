# Use Node.js v16 LTS
FROM node:16

# Set the working directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Define the command to run the app.
CMD ["npm", "start"]