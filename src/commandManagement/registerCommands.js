const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const { DISCORD_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const commandsDir = path.join(__dirname, '../commands');

const commands = [];

const commandFiles = fs
  .readdirSync(commandsDir)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsDir, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

async function registerCommands() {
  try {
    console.log('Registrando comandos...');

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
}

registerCommands();
