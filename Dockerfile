### STAGE 1: Build ###
FROM node:16.5.0-alpine AS compile-image
WORKDIR /opt/ng
COPY .npmrc package.json yarn.lock ./
RUN npm install -g yarn --force

### STAGE 2: Run ###
CMD ["yarn", "start"]	#Funciono

COPY . ./

### STAGE 3: Expose ###
EXPOSE 4200