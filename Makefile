war:
	cd Frontend; \
	npm install; \
	ng build --target production
	cd Backend; \
	mvn compile war:war
