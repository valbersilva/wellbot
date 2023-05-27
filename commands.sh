#!/bin/bash

export $(cat .env | xargs)

if [ "$1" = "register" ]; then
  node ./src/commandManagement/registerCommands.js
elif [ "$1" = "delete" ]; then
  node ./src/commandManagement/deleteCommands.js
else
  echo "Comando inválido. Use 'register' ou 'delete'."
fi

