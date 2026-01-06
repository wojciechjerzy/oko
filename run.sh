#!/bin/bash

set -e

echo "=== Aktualizacja systemu ==="
sudo apt update -y
sudo apt install -y git curl

echo "=== Instalacja najnowszego NVM ==="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# Załadowanie NVM w bieżącej sesji
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

echo "=== Instalacja Node.js 24 przez NVM ==="
nvm install 24
nvm alias default 24

NODE_PATH=$(which node)
NPM_PATH=$(which npm)

echo "Używany Node: $NODE_PATH"
echo "Używany npm: $NPM_PATH"

echo "=== Klonowanie repozytorium OKO ==="
cd "$HOME"

if [ -d "oko" ]; then
  echo "Repo oko już istnieje – pomijam klonowanie"
else
  git clone https://github.com/wojciechjerzy/oko
fi

echo "=== Instalacja zależności projektu ==="
cd oko
npm install

echo "=== Konfiguracja autostartu ==="

# Utworzenie usługi systemd
SERVICE_FILE=/etc/systemd/system/oko.service

sudo bash -c "cat > $SERVICE_FILE" <<EOF
[Unit]
Description=OKO Node App
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$HOME/oko
ExecStart=$NODE_PATH $HOME/oko/node_modules/.bin/npm run start
Restart=always
Environment=PATH=$HOME/.nvm/versions/node/v24/bin:/usr/bin:/bin

[Install]
WantedBy=multi-user.target
EOF

echo "=== Rejestracja usługi ==="
sudo systemctl daemon-reload
sudo systemctl enable oko.service
sudo systemctl start oko.service

echo "=== Gotowe! Aplikacja OKO dodana do autostartu ==="
echo "Status usługi:"
sudo systemctl status oko.service