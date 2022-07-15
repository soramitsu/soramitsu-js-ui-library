FROM mhart/alpine-node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install && yarn cache clean
COPY . .
EXPOSE 6006
RUN adduser --disabled-password --gecos "" app && chown -R app ./
USER app
CMD [ "yarn", "sb:serve" ]