FROM node:22-bookworm

# Atualiza o sistema
RUN apt-get update

# Instala Python
RUN apt-get install -y python3 python3-pip

# Instala Java (necessário para tabula)
RUN apt-get install -y default-jre

# Instala LibreOffice
RUN apt-get install -y libreoffice

# Instala Poppler
RUN apt-get install -y poppler-utils

# Instala Ghostscript
RUN apt-get install -y ghostscript

# Instala outras dependências úteis
RUN apt-get install -y \
    libgl1 \
    libglib2.0-0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY requirements.txt ./

RUN pip3 install --break-system-packages -r requirements.txt

COPY . .

EXPOSE 10000

CMD ["npm","start"]