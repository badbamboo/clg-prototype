parent_dir		:= $(abspath $(makefile_dir)/..)
ENVIRONMENT		?= dev
export

CLG				:= $(PWD)/clg.json
APP_ID 			:= $(shell jq -r '.name' package.json)
APP_PORT		:= $(shell jq -r '.port' $(CLG))
APP_VERSION 	:= 	$(shell jq -r '.version' package.json)
NPM_REGISTRY	:= https://registry.npmjs.org/
PID				:= $(shell lsof -i :$(APP_PORT) | cut -d' ' -f2)
DOCKER_NAME		:= $(APP_ID)/$(APP_VERSION)
DOCKER_ID	:= $(shell docker images 'clg-prototype/0.0.2' -a -q)
################################################################
# CMDS: APP
################################################################
app-build:
	@make app-bump
	@rm -rf dist
	@npm cache clean --force
	@npm install --save --legacy-peer-deps
	@nest build

app-bump:
	@bump

app-config: 
	@echo "CLG: $(CLG)"
	@echo "APP_ID: $(APP_ID)"
	@echo "APP_PORT: $(APP_PORT)"
	@echo "APP_VERSION: $(APP_VERSION)"

app-docker-build:
	docker build -t $(DOCKER_NAME) . 

app-docker-remove:
	@echo "DOCKER_NAME: $(DOCKER_NAME)"
	@echo "DOCKER_ID: $(DOCKER_ID)"
	docker container stop $(DOCKER_ID)
	docker rm -f $(DOCKER_ID)

app-docker-up:
	docker run -p$(APP_PORT):$(APP_PORT)  --name $(DOCKER_ID) $(DOCKER_NAME)
	make app-docker-remove > /dev/null &

app-documentation:
	@rm -rf public/*
	@npx arkit
	@npm run compodoc
	@make app-serve

app-init:
	@npm config set registry $(NPM_REGISTRY)
	@npm config get registry
	@npm cache clean --force
	@npm install --save --legacy-peer-deps
	@npm i --save lodash --legacy-peer-deps

app-kill:
	lsof -i :$(APP_PORT)
	kill -9 $(PID)
	
app-serve:
	@npm run start:$(ENVIRONMENT)

app-tag:
	git tag -a $(APP_VERSION) -m "$(m)"
	git push origin $(APP_VERSION)
	git tag -d $(APP_VERSION)

app-test:
	npm run test:cov; mv jest-stare public/; mv test-report.html public/coverage/index.html
################################################################	
# CMDS: UTILITIES
################################################################
FLD_MODEL	:= $(PWD)/src/model
FILE_MODEL	:= $(FLD_MODEL)/index.ts
model-export:
	@echo "FILE_MODEL: $(FILE_MODEL)"
	@echo "" > $(FILE_MODEL)
	@find $(FLD_MODEL)/*.model.ts -type f | xargs tail -n +1 > $(FILE_MODEL)
	@sed -i -e '/\import.*/d' $(FILE_MODEL);
	@sed -i -e '/\==./d' $(FILE_MODEL);sed -i -e '/import./d' $(FILE_MODEL)
	@rm $(FILE_MODEL)-e
