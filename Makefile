build:
	npm run react-build

.PHONY: build

docker-login:
	aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 101174869400.dkr.ecr.ap-south-1.amazonaws.com

NAME := raven-email-editor
DOCKER_REPO := 101174869400.dkr.ecr.ap-south-1.amazonaws.com/$(NAME)
DOCKER_PROD_REPO := 101174869400.dkr.ecr.ap-south-1.amazonaws.com/$(NAME)-prod

docker-build: docker-login
	docker build --build-arg CODEARTIFACT_AUTH_TOKEN="$CODEARTIFACT_AUTH_TOKEN" --build-arg ENV="staging" -t $(NAME) .

docker-build-prod: docker-login
	docker build --build-arg CODEARTIFACT_AUTH_TOKEN="$CODEARTIFACT_AUTH_TOKEN" --build-arg ENV="prod" -t $(NAME) .

docker-push: TAG ?= latest
docker-push: docker-build
	docker tag $(NAME):latest $(DOCKER_REPO):$(TAG)
	docker push $(DOCKER_REPO):$(TAG)

docker-push-prod: TAG ?= latest
docker-push-prod: docker-build-prod
	docker tag $(NAME):latest $(DOCKER_PROD_REPO):$(TAG)
	docker push $(DOCKER_PROD_REPO):$(TAG)

.PHONY: build