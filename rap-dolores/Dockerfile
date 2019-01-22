# FROM node:10.1.0
# MAINTAINER ryn
# RUN mkdir -p /home/rap2-dolores
# WORKDIR /home/rap2-dolores

# # Bundle app source
# COPY . /home/rap2-dolores
# RUN npm install -g http-server
# RUN npm install --unsafe-perm -g node-sass
# RUN npm install
# RUN npm run build

FROM node:10.1.0

WORKDIR /app
ADD . /tmp
RUN /bin/sh -c 'cd /tmp && npm install -g http-server && npm rebuild node-sass --force && npm run build && mv ./build/* /app/ && mv ./node_modules /app/ && rm -rf /tmp'