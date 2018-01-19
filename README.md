Запуск для os x

Перед запуском проекта необходимо:

1. Установить Homebrew

2. Установить Geth - для работы с Ethereum нодой

$ brew tap ethereum/ethereum brew install ethereum

Запуск ноды

$ geth --dev --datadir ~/Library/Ethereum/geth  --ipcpath ~/Library/Ethereum/geth.ipc console --rpccorsdomain "*" --rpc --networkid 8545 --minerthreads "1" --rpcapi "admin,debug,miner,shh,txpool,personal,eth,net,web3" console

* При первом запуске необходимо создать аккаунт и запустить майнинг

$ personal.newAccount(‘secretpassword’)

$ miner.start()

3. Node.js (v.7.10.0)

$ brew install nvm

$ nvm install 7.10.0

4. Клонируем проект

git clone https://github.com/storonaot/medical-card.git

5. Переходим в проект и инсталируем зависимости

$ cd medical-card

$ npm i

Для запуска проекта в разных окнах терминала:

$ npm start

$ node electron-wait-react

! Необходимо также запустить API для приложения
https://github.com/storonaot/medical-card-api
