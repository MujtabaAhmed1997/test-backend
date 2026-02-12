# Multi-stage build to reduce image size
# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code and config files (dist will be created by build, so excluding it is fine)
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

# Build the application (verbose output to see what's happening)
RUN npm run build 2>&1

# List contents to debug
RUN echo "=== Contents of /app after build ===" && \
    ls -la /app/ && \
    echo "=== Checking for dist folder ===" && \
    if [ -d "/app/dist" ]; then \
      echo "✓ dist folder exists!" && \
      ls -la /app/dist/; \
    else \
      echo "✗ dist folder NOT found!" && \
      echo "Looking for alternative output locations..." && \
      find /app -name "main.js" -o -name "*.js" | head -10; \
      exit 1; \
    fi

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

