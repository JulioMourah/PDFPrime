FROM node:22-bookworm

RUN apt-get update && apt-get install -y \
    libreoffice \
    qpdf \
    poppler-utils \
    ghostscript \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY requirements.txt ./

RUN pip3 install --break-system-packages -r requirements.txt

COPY . .

EXPOSE 10000

CMD ["npm", "start"]