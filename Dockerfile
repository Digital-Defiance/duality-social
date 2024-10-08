# Use the official Node.js LTS (Long Term Support) image as the base image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18-bullseye
RUN sudo apt update && sudo apt upgrade -y && apt install -y build-essential python2 && npm install -g npm nx yarn

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY ./package.json ./*package-lock.json *yarn.lock ./

# Copy the rest of the application code
RUN mkdir -p ./libs ./apps
COPY ./.npmrc ./.npmrc
RUN cp ./.npmrc ~/.npmrc
COPY ./libs/duality-social-lib ./libs/duality-social-lib
COPY ./apps/duality-social-react ./apps/duality-social-react
COPY ./apps/duality-social-node ./apps/duality-social-node

# Build the application
RUN yarn build:all:dev

# Expose the desired port (e.g., 3000, 4200, or 8080)
EXPOSE 3000

# Start the application
CMD ["node", "./dist/apps/duality-social-node/main.js"]
