FROM node:18
WORKDIR /app
COPY package.json .
RUN  npm i
COPY . .
# CMD ["npm" ,"run","start:dev" ]
CMD ["npm" ,"run","test:e2e:watch" ]
EXPOSE 3000