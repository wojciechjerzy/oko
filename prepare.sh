#!/bin/bash

set -e

echo "=== Aktualizacja systemu ==="
sudo apt update -y
sudo apt install -y git curl

echo "=== Instalacja najnowszego NVM ==="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

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