# ============================================
# IALOC API - Docker Makefile
# ============================================

.PHONY: help build up down restart logs shell migrate seed fresh test clean

# Default target
help:
	@echo "IALOC API Docker Commands"
	@echo "========================="
	@echo ""
	@echo "  make build      - Build Docker image"
	@echo "  make up         - Start containers"
	@echo "  make down       - Stop containers"
	@echo "  make restart    - Restart containers"
	@echo "  make logs       - View container logs"
	@echo "  make shell      - Open shell in container"
	@echo "  make migrate    - Run database migrations"
	@echo "  make seed       - Run database seeders"
	@echo "  make fresh      - Fresh migration with seeders"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Remove all containers and volumes"
	@echo ""
	@echo "MySQL Profile:"
	@echo "  make up-mysql   - Start with MySQL database"
	@echo ""
	@echo "Redis Profile:"
	@echo "  make up-redis   - Start with Redis cache"
	@echo ""
	@echo "Full Stack:"
	@echo "  make up-full    - Start with MySQL and Redis"

# Build the Docker image
build:
	docker compose build --no-cache

# Start containers (SQLite mode)
up:
	docker compose --env-file .env.docker up -d

# Start with MySQL
up-mysql:
	docker compose --env-file .env.docker --profile mysql up -d

# Start with Redis
up-redis:
	docker compose --env-file .env.docker --profile redis up -d

# Start with MySQL and Redis
up-full:
	docker compose --env-file .env.docker --profile mysql --profile redis up -d

# Stop containers
down:
	docker compose down

# Restart containers
restart: down up

# View logs
logs:
	docker compose logs -f api

# Open shell in the API container
shell:
	docker compose exec api sh

# Run migrations
migrate:
	docker compose exec api php artisan migrate --force

# Run seeders
seed:
	docker compose exec api php artisan db:seed --force

# Fresh migration with seeds
fresh:
	docker compose exec api php artisan migrate:fresh --seed --force

# Run tests
test:
	docker compose exec api php artisan test

# Clean everything
clean:
	docker compose down -v --rmi local
	docker system prune -f

# Production deployment
deploy:
	@echo "Building production image..."
	docker compose build
	@echo "Starting services..."
	docker compose --env-file .env.docker up -d
	@echo "Running migrations..."
	docker compose exec api php artisan migrate --force
	@echo "✅ Deployment complete!"
