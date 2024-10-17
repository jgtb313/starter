# Usa a imagem base oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho na imagem
WORKDIR /app

# Copia o arquivo package.json e yarn.lock do diretório da API
COPY . .

# Instala as dependências da API
RUN yarn install

# Builda a API
RUN yarn api:build

# Expõe a porta 4000
EXPOSE 4000

# Define o comando para rodar a API
CMD ["yarn", "api:start"]
