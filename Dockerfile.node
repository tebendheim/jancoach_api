FROM node:18

WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .

# Install ts-node-dev globally
# Install TypeScript and ts-node-dev globally
RUN yarn global add typescript ts-node-dev

# Expose the application port
EXPOSE 3000

# Command to run your app using ts-node-dev
CMD ["ts-node-dev", "--respawn", "src/index.ts"]



# Command to run your app using nodemon
# CMD ["yarn dev"]