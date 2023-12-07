#Makefile
install:
	npm ci

publish:
	npm publish --dry-run

genDiff:
	node bin/gendiff.js