#Makefile
install:
	npm ci

publish:
	npm publish --dry-run

brain-games:
	node bin/gendiff.js