FROM mcr.microsoft.com/playwright:v1.41.1-jammy

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]

