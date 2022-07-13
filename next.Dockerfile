FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 6006
CMD [ "yarn", "sb:serve" ]

