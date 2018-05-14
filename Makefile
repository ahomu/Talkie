#MAKEFLAGS = -j1

NODE_BIN := node
NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN_DIR := $(NPM_MOD_DIR)/.bin
WEBCOMPONENTS_DIR := $(NPM_MOD_DIR)/@webcomponents/webcomponentsjs

DIST_DIR := ./dist

.DEFAULT_GOAL := help

# Self-Documented Makefile
# ref. https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@exit 1 ## I'd like to notice to fail if user call 'make' without any target.

# Dev

.PHONY: build
build: format clean rollup postcss theme-default copy-webcomponentsjs ## Build All

.PHONY: dev
dev: ## Incremental Build All
	$(MAKE) copy-webcomponentsjs
	$(MAKE) -j rollup-watch postcss-watch theme-default-watch serve

.PHONY: serve
serve: ## Serve file
	python -m SimpleHTTPServer

# Build

.PHONY: rollup
rollup:
	$(NPM_BIN_DIR)/rollup --config ./rollup.config.js

.PHONY: rollup-watch
rollup-watch:
	$(NPM_BIN_DIR)/rollup --config ./rollup.config.js --watch

.PHONY: copy-webcomponentsjs
copy-webcomponentsjs:
	cp $(WEBCOMPONENTS_DIR)/webcomponents-hi.js ./dist
	cp $(WEBCOMPONENTS_DIR)/webcomponents-hi-ce.js ./dist
	cp $(WEBCOMPONENTS_DIR)/webcomponents-hi-sd.js ./dist
	cp $(WEBCOMPONENTS_DIR)/webcomponents-hi-sd-ce.js ./dist
	cp $(WEBCOMPONENTS_DIR)/webcomponents-lite.js ./dist
	cp $(WEBCOMPONENTS_DIR)/webcomponents-loader.js ./dist
	cp $(WEBCOMPONENTS_DIR)/webcomponents-sd-ce.js ./dist

.PHONY: postcss
postcss:
	$(NPM_BIN_DIR)/postcss --output ./dist/talkie.css ./src/style/index.css --verbose

.PHONY: postcss-watch
postcss-watch:
	$(NPM_BIN_DIR)/postcss --output ./dist/talkie.css ./src/style/index.css --verbose --watch

.PHONY: theme-default
theme-default:
	$(NPM_BIN_DIR)/postcss --output ./dist/talkie.theme-default.css ./src/theme/default/index.css --verbose

.PHONY: theme-default-watch
theme-default-watch:
	$(NPM_BIN_DIR)/postcss --output ./dist/talkie.theme-default.css ./src/theme/default/index.css --verbose --watch

# Utilities

.PHONY: format
format: ## Auto formatting
	$(NPM_BIN_DIR)/prettier --config ./prettier.config.js --write './**/*.+(ts|js)'

.PHONY: clean
clean: ## Clean distribution dir
	rm -rf $(DIST_DIR)
