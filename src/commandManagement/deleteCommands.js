const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const { DISCORD_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

async function deleteCommands() {
  try {
    console.log('Excluindo comandos...');

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: [],
    });

    console.log('Comandos excluídos com sucesso!');
  } catch (error) {
    console.error(error);
  }
}

deleteCommands();
