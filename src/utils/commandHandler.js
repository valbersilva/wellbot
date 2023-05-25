const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

// função que cria uma collection com os comandos
function commandHandler() {
  // instancia uma nova collection
  const commandsCollection = new Collection();
  const commandFiles = fs
    .readdirSync(path.join(__dirname, '../commands'))
    .filter((file) => file.endsWith('.js'));

  // ate aqui é a mesma cois do arquivo commands.js
  for (const file of commandFiles) {
    const command = require(path.join(__dirname, '../commands', file));
    // verifica se existe a propridade data e execute dentro da importação do comando
    // no caso checa se segue aquele esqueleto
    if ('data' in command && 'execute' in command) {
      // caso esta tudo certo adiciona esse comando na collection
      commandsCollection.set(command.data.name, command);
    } else {
      // se nao tiver mostra um erro no log
      console.log(
        `Esse comando em ${filePath} está com "data" ou "execute ausentes"`
      );
    }
  }

  // returna a collection
  return commandsCollection;
}

module.exports = { commandHandler };
