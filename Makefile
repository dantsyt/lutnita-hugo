.DEFAULT_GOAL:=serve

.PHONY: clear build serve

clear:
	rm -rf public/

build: clear
	hugo

serve: build
	hugo serve --noHTTPCache
