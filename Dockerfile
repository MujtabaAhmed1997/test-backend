# Multi-stage build to reduce image size
# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Verify dist folder was created
RUN ls -la /app/ && \
    if [ ! -d "/app/dist" ]; then \
      echo "ERROR: dist folder not found after build"; \
      echo "Contents of /app:"; \
      ls -la /app/; \
      exit 1; \
    fi && \
    echo "Build successful, dist folder exists:" && \
    ls -la /app/dist/

# Stage 2: Production image (only runtime dependencies)
FROM node:20-alpine AS runner
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy package files
COPY package.json package-lock.json ./

# Install ONLY production dependencies (excludes devDependencies)
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nestjs

EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]

