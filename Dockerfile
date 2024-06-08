FROM node:18-alpine As development
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# COPY .env ./

# ENV NODE_ENV development


RUN npm run build

EXPOSE 3000

CMD ["/bin/sh", "entrypoint.sh"]