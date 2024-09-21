# Usar uma imagem base do Node.js
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar todos os arquivos do diretório root
COPY . .

# Instalar dependências do monorepo
RUN yarn install --frozen-lockfile

# Definir o diretório de trabalho para a API
WORKDIR /app/apps/api

# Construir a aplicação
RUN yarn artifacts:build && yarn build

# Expor a porta que sua API irá usar
EXPOSE 3000

# Comando para iniciar a API
CMD ["yarn", "start"]
