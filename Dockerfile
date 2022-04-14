FROM node:16-alpine

WORKDIR /app
COPY . .
RUN \
  npm install && \
  cd frontend && npm install && \
  cd ../backend && npm install

RUN npm run build

RUN adduser -D myuser
USER myuser

CMD [ "npm", "run", "start" ]
