FROM node:24-alpine

WORKDIR /app

# Habilita pnpm mediante Corepack
RUN corepack enable

# Copiamos los archivos necesarios para instalar dependencias
COPY package*.json pnpm-*.yaml ./

# Instalamos dependencias
RUN pnpm install

# Copiamos el resto del proyecto
COPY . .

EXPOSE 5173

USER node

CMD ["pnpm", "dev", "--host", "0.0.0.0"]