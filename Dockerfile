# Dockerfile for the entire application

# Use a Node.js base image for the frontend
FROM node:14 AS frontend
# Copy frontend source code and install dependencies
COPY frontend/package.json frontend/package-lock.json /app/
WORKDIR /app/frontend
RUN npm install
COPY frontend /app/frontend
RUN npm run build

# Use a PostgreSQL base image for the database
FROM postgres:15 AS database
# Copy SQL scripts to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Use a Node.js base image for the backend
FROM node:14 AS backend
# Copy backend source code and install dependencies
COPY backend/package.json backend/package-lock.json /app/
WORKDIR /app/backend
RUN npm install
COPY backend /app/backend

# Final image
FROM node:14
# Copy built frontend assets and backend code
COPY --from=frontend /app/frontend/build /app/frontend/build
COPY --from=backend /app/backend /app/backend
# Set environment variables
ENV NODE_ENV=production
# Expose port
EXPOSE 3000
# Command to start the application
CMD ["node", "/app/backend/index.js"]
