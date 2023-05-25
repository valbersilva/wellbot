// fs e path são modulos nativo do node para lidar com arquivos e caminhos
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

const commands = [];

// procura todos os arquivos que terminam com .js na pasta commands
const commandFiles = fs
  .readdirSync(path.join(__dirname, './commands'))
  .filter((file) => file.endsWith('.js'));

// a cada interação adiciona o nome de um arquivo na variavel file
for (const file of commandFiles) {
  // faz a importação do arquivo para a variavel command
  const command = require(path.join(__dirname, './commands', file));
  // adiciona o commando ({ data: ..., execute: ...}) dentro de commands
  commands.push(command.data.toJSON());
}

/*
  no final a varivael commands deve ficar assim
  [{ data: ..., execute: ...},{ data: ..., execute: ...}]
*/

//função que registra os comandos no discord
const registerCommands = async (clientId, guildId, token) => {
  const rest = new REST({ version: '10' }).setToken(token);

  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
};

module.exports = { registerCommands };
