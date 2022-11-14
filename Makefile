parent_dir		:= $(abspath $(makefile_dir)/..)
ENVIRONMENT		?= dev
export

CLG			:= $(PWD)/clg.json
APP_ID 		:= $(shell jq -r '.name' package.json)
APP_PORT	:= $(shell jq -r '.port' $(CLG))
APP_VERSION 	:= 	$(shell jq -r '.version' package.json)
NPM_REGISTRY	:= https://registry.npmjs.org/
SERVER_PORT		:= $(shell lsof -i :$(APP_PORT) | cut -d' ' -f5)
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

app-conf: 
	@echo "CLG: $(CLG)"
	@echo "APP_ID: $(APP_ID)"
	@echo "APP_PORT: $(APP_PORT)"
	@echo "APP_VERSION: $(APP_VERSION)"

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
	lib-kill: 
	lsof -i :$(APP_PORT)
	kill -9 $(SERVER_PORT)
	
app-serve:
	@npm run start:$(ENVIRONMENT)

app-tag:
	git tag -a $(APP_VERSION) -m "$(m)"
	git push origin $(APP_VERSION)
	git tag -d $(APP_VERSION)

app-test:
	rm -rf public/jest-stare
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
