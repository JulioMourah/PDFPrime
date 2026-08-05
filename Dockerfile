FROM node:22-bookworm

# Instala LibreOffice, QPDF, Poppler e Python
RUN apt-get update && apt-get install -y \
    libreoffice \
    qpdf \
    poppler-utils \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10000

CMD ["npm", "start"]