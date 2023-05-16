FROM node:18-alpine
USER node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN npm install && npm run build && npx prisma db push

EXPOSE 3001
CMD [ "npm", "run", "start" ]
