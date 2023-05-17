up:
	docker compose -f docker-compose.nginx.yml up -d
	docker compose -f docker-compose.backend.yml up -d
	docker compose -f docker-compose.uptime-kuma.yml up -d

down:
	docker compose -f docker-compose.nginx.yml down
	docker compose -f docker-compose.backend.yml down
	docker compose -f docker-compose.uptime-kuma.yml down

